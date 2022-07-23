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
	exception: '',
	critical: '',
	major: '',
	minor: '',
	rows: 3,

	getSetting: () => {
		const { exception, critical, major, minor, rows } = get();
		return { exception, critical, major, minor, rows };
	},

	setException(setting: string): void {
		set({ exception: setting });
	},

	setCritical(setting: string): void {
		set({ critical: setting });
	},

	setMajor(setting: string): void {
		set({ major: setting });
	},

	setMinor(setting: string): void {
		set({ minor: setting });
	},

	setRows(setting: number): void {
		set({ rows: setting });
	},
}));

export default settingModel;
