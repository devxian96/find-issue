export interface thumbnailType {
	url: string;
	videoThumbnail: boolean;
	vrthumbnail: boolean;
}

export interface issueType {
	id?: string;
	type?: number;
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
