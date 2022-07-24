import create from 'zustand';

interface settingType {
	exception: string;
	critical: string;
	major: string;
	minor: string;
	rows: number;
	getSetting: () => { exception: string; critical: string; major: string; minor: string; rows: number };
	setException: (setting: string) => void;
	setCritical: (setting: string) => void;
	setMajor: (setting: string) => void;
	setMinor: (setting: string) => void;
	setRows: (setting: number) => void;
}

const settingModel = create<settingType>((set, get) => ({
	exception: localStorage.getItem('exception') || '',
	critical: localStorage.getItem('critical') || '',
	major: localStorage.getItem('major') || '',
	minor: localStorage.getItem('minor') || '',
	rows: parseInt(localStorage.getItem('rows') ?? '20', 10),

	getSetting: () => {
		const { exception, critical, major, minor, rows } = get();
		return { exception, critical, major, minor, rows };
	},

	setException(setting: string): void {
		localStorage.setItem('exception', setting);
		set({ exception: setting });
	},

	setCritical(setting: string): void {
		localStorage.setItem('critical', setting);
		set({ critical: setting });
	},

	setMajor(setting: string): void {
		localStorage.setItem('major', setting);
		set({ major: setting });
	},

	setMinor(setting: string): void {
		localStorage.setItem('minor', setting);
		set({ minor: setting });
	},

	setRows(setting: number): void {
		localStorage.setItem('rows', `${setting}`);
		set({ rows: setting });
	},
}));

export default settingModel;
