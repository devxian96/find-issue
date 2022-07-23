import create from 'zustand';

interface thumbnailType {
	url: string;
	videoThumbnail: boolean;
	vrthumbnail: boolean;
}

interface issueType {
	addDate: number;
	blogId: string;
	blogName: string;
	contents: string;
	gdid: string;
	hasThumbnail: boolean;
	logNo: number;
	marketPost: boolean;
	nickName: string;
	noTagTitle: string;
	postUrl: string;
	product: null;
	profileImgUrl: string;
	thumbnails: thumbnailType[];
	title: string;
}

interface issueListType {
	issueList: issueType[];
	getIssueList: () => issueType[];
	setIssueList: (issueList: issueType[]) => void;
}

const issueListModel = create<issueListType>((set, get) => ({
	issueList: [],

	getIssueList: () => get().issueList,

	setIssueList(issueList: issueType[]): void {
		set(() => ({ issueList }));
	},
}));

export default issueListModel;
