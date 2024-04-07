import { Injectable, HostListener} from '@angular/core';

import { BehaviorSubject,} from 'rxjs';

// Menu
export interface Menu {
	path?: string;
	title?: string;
	icon?: string;
	type?: string;
	badgeType?: string;
	badgeValue?: string;
	active?: boolean;
	bookmark?: boolean;
	children?: Menu[];
}

@Injectable({
	providedIn: 'root'
})

export class NavService {

	public screenWidth: any
	public collapseSidebar: boolean = false

	constructor() {
		this.onResize();
		if (this.screenWidth < 991) {
			this.collapseSidebar = true
		}
	}

	// Windows width
	@HostListener("window:resize", ['$event'])
	onResize(event?:any) {
		this.screenWidth = window.innerWidth;
	}

	MENUITEMS: Menu[] = [
		{
			path: 'home', title: 'Dashboard', icon: 'home', type: 'link', badgeType: 'primary', active: false
		},
		{
			title: 'Quiz', icon: 'box', type: 'sub', active: false, children: [
				{
					 path: 'quizList', title: 'Quiz List', type: 'link' 
				},
				{
					path: 'quiz/:id', title: 'Quiz Creation', type: 'link'
				},
				{
					path: 'template', title: 'Template Creation', type: 'link'
				},
				{
					path: 'category', title: 'Category', type: 'link'
				},
			]
		},
		{
			title:'Institution', icon: 'globe', type:'sub', active:false, children:[
				{
					path: 'addinstitution', title: 'Add Institution', type: 'link' 
			   },
			   {
				path: 'assignbatchquiz', title: 'Assign Quiz', type: 'link' 
		       },
			]
		},

		{
            path: 'result', title: 'Result', icon: 'book', type: 'link', badgeType: 'primary', active: false
        },
		{
            path: 'logger', title: 'Logger', icon: 'chevrons-right', type: 'link', badgeType: 'primary', active: false
        },
		
		{
			title: 'Settings', icon: 'settings', type: 'sub', children: [
				{ path: 'profile', title: 'Profile', type: 'link' },
			]
		}

		
	]
	// Array
	items = new BehaviorSubject<Menu[]>(this.MENUITEMS);


}
