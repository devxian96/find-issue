import { app, BrowserWindow, shell, ipcMain } from 'electron';
import { release } from 'os';
import axios from 'axios';
import { join } from 'path';

// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) app.disableHardwareAcceleration();

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName());

if (!app.requestSingleInstanceLock()) {
	app.quit();
	process.exit(0);
}

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true';

export const ROOT_PATH = {
	// /dist
	dist: join(__dirname, '../..'),
	// /dist or /public
	public: join(__dirname, app.isPackaged ? '../..' : '../../../public'),
};

let win: BrowserWindow | null = null;
// Here, you can also use other preload
const preload = join(__dirname, '../preload/index.js');
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin
const url = `http://${process.env.VITE_DEV_SERVER_HOST}:${process.env.VITE_DEV_SERVER_PORT}`;
const indexHtml = join(ROOT_PATH.dist, 'index.html');

async function createWindow() {
	win = new BrowserWindow({
		title: 'Main window',
		width: 1500,
		height: 700,
		icon: join(ROOT_PATH.public, 'favicon.svg'),
		webPreferences: {
			preload,
			nodeIntegration: true,
			contextIsolation: false,
		},
	});

	if (app.isPackaged) {
		win.loadFile(indexHtml);
	} else {
		win.loadURL(url);
		// win.webContents.openDevTools()
	}

	// Test actively push message to the Electron-Renderer
	win.webContents.on('did-finish-load', () => {
		win?.webContents.send('main-process-message', new Date().toLocaleString());
	});

	// Make all links open with the browser, not with the application
	win.webContents.setWindowOpenHandler(({ url }) => {
		if (url.startsWith('https:')) shell.openExternal(url);
		return { action: 'deny' };
	});
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
	win = null;
	if (process.platform !== 'darwin') app.quit();
});

app.on('second-instance', () => {
	if (win) {
		// Focus on the main window if the user tried to open another
		if (win.isMinimized()) win.restore();
		win.focus();
	}
});

app.on('activate', () => {
	const allWindows = BrowserWindow.getAllWindows();
	if (allWindows.length) {
		allWindows[0].focus();
	} else {
		createWindow();
	}
});

// new window example arg: new windows url
ipcMain.handle('open-win', (event, arg) => {
	const childWindow = new BrowserWindow({
		webPreferences: {
			preload,
		},
	});

	if (app.isPackaged) {
		childWindow.loadFile(indexHtml, { hash: arg });
	} else {
		childWindow.loadURL(`${url}/#${arg}`);
	}
});

const rangeInt = (from, to) => Array.from({ length: to - from + 1 }, (e, i) => i + from);

ipcMain.on('synchronous-list', async (event, arg) => {
	const resultArray = [];
	const times = rangeInt(1, Math.ceil(arg.count / 20));
	// eslint-disable-next-line no-restricted-syntax
	for await (const time of times) {
		await axios
			.get('https://section.blog.naver.com/ajax/SearchList.naver', {
				headers: {
					Accept: 'application/json, text/plain, */*',
					'Accept-Encoding': 'gzip, deflate, br',
					Host: 'section.blog.naver.com',
					'User-Agent':
						'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.6 Safari/605.1.15',
					'Accept-Language': 'ko-KR,ko;q=0.9',
					Referer: 'https://section.blog.naver.com/',
					Connection: 'keep-alive',
				},
				params: {
					countPerPage: arg.count > 20 * time ? 20 : arg.count - 20 * (time - 1),
					currentPage: time,
					keyword: arg.search,
					orderBy: 'recentdate',
				},
			})
			.then(({ data }) => {
				const { result } = JSON.parse(data.replace(")]}',", '').replaceAll('gdid', 'id'));
				resultArray.push(...result.searchList);
			})
			.catch((err) => {
				console.log(err);
			});
	}
	event.returnValue = resultArray;
});

ipcMain.on('synchronous-page', (event, arg) => {
	axios
		.get('https://blog.naver.com/PostView.naver', {
			params: {
				blogId: arg.blogId,
				logNo: arg.logNo,
			},
		})
		.then(({ data }) => {
			event.returnValue = data;
		})
		.catch((err) => {
			console.log(err);
		});
});
