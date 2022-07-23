import create from 'zustand';
import type { issueType } from '../types/common';

interface issueListType {
	issueList: issueType[];
	getIssueList: () => issueType[];
	setIssueList: (issueList: issueType[]) => void;
	setTypeAndContent: (text: string, uniqueId: string, type: number) => void;
}

const issueListModel = create<issueListType>((set, get) => ({
	issueList: [],

	getIssueList: () => get().issueList,

	setIssueList(issueList: issueType[]): void {
		set(() => ({ issueList }));
	},

	setTypeAndContent(text: string, uniqueId: string, type: number): void {
		const id = get().issueList.findIndex(({ id, gdid }) => id === uniqueId || gdid === uniqueId);

		set((state) => ({
			issueList: Object.values({
				...state.issueList,
				[id]: { ...state.issueList[id], contents: text, type },
			}).map((data) => data),
		}));
		console.log(id, get().issueList);
	},
}));

export default issueListModel;
