import create from 'zustand';

interface projectStatusType {
	isProjectLoading: boolean;
	getProjectStatus: () => boolean;
	setProjectStatus: (isProjectLoading: boolean) => void;
}

const projectStatusModel = create<projectStatusType>((set, get) => ({
	isProjectLoading: false,

	getProjectStatus: () => get().isProjectLoading,

	setProjectStatus(isProjectLoading: boolean): void {
		set(() => ({ isProjectLoading }));
	},
}));

export default projectStatusModel;
