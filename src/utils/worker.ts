import { ipcRenderer } from 'electron';
import type { issueType } from '../types/common';

export function call(search: issueType) {
	return {
		html: ipcRenderer.sendSync('synchronous-page', { blogId: search.blogId, logNo: search.logNo }),
		id: search.id,
	};
}
