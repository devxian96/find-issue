import create from 'zustand';
import _ from 'lodash';
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
		const result = _.uniqBy(issueList, 'id');
		set(() => ({ issueList: result }));
	},

	setTypeAndContent(text: string, uniqueId: string, type: number): void {
		const id = get().issueList.findIndex(({ id, gdid }) => id === uniqueId || gdid === uniqueId);

		set((state) => ({
			issueList: Object.values({
				...state.issueList,
				[id]: { ...state.issueList[id], contents: text, type },
			}).map((data) => data),
		}));
	},
}));

export default issueListModel;
