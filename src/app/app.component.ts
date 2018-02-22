import { Component, OnInit, HostListener } from '@angular/core';
import { pageTransition } from './page-animation';

@Component({
    selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
    animations: pageTransition
})

export class AppComponent implements OnInit  {
    innerHeight: any;
    subscribeHttp: any;
    data: any;
    subData: object;
    subSubData: object;
    px: number = 45.5;
    smDevice: boolean;

    // ANIMATION
    state: string;
    toggle: boolean = false;
    
    // SUB MENU STYLING (width > 767px)
    scrollTop: number = 0;
    topInt: number = 0;
    top: string = '0px';
    display: string = 'none';
    maxHeight: string = '0px';

    // SUB SUB MENU STYLING (width > 767px)
    subScrollTop: number = 0;
    subLeft: string = '0px';
    subTop: string = '0px';
    subDisplay: string = 'none';
    subMaxHeight: string = '0px';

    // SUB & SUB SUB MENU STYLING (width < 768px)
    smDisplay = [false];
    smSubDisplay = [false];

    public constructor() {
        this.smDevice = this.isSmallDevice();
    }

    ngOnInit() {
        this.state = this.smDevice ? 'hidden' : 'active';
        this.innerHeight = window.innerHeight;
        this.data = [
			{
				id: 1,
				title: 'Title A',
				icon: 'dashboard',
				icon_text: '',
				state: ''
			},
			{
				id: 2,
				title: 'Title 1',
				icon: '',
				icon_text: 'A',
				state: 'admin'
			},
			{
				id: 3,
				title: 'Title B',
				icon: '',
				icon_text: 'A',
				state: ''
			},
			{
				id: 4,
				title: 'Title 2',
				icon: '',
				icon_text: 'A',
				state: '',
				sub: [
					{
						id: 5,
						title: 'Sub 1',
						icon: '',
						icon_text: 'C',
						state: 'test'
					},
					{
						id: 6,
						title: 'Sub 2',
						icon: '',
						icon_text: 'C',
						state: 'test'
					}
				]
			},
			{
				id: 2,
				title: 'Title 3',
				icon: '',
				icon_text: 'A',
				state: 'admin'
			},
			{
				id: 2,
				title: 'Title 4',
				icon: '',
				icon_text: 'A',
				state: 'admin'
			},
			{
				id: 4,
				title: 'Title 5',
				icon: '',
				icon_text: 'A',
				state: '',
				sub: [
					{
						id: 5,
						title: 'Sub 1',
						icon: '',
						icon_text: 'C',
						state: 'test'
					},
					{
						id: 6,
						title: 'Sub 2',
						icon: '',
						icon_text: 'C',
						state: 'test'
					}
				]
			},
			{
				id: 4,
				title: 'Title 6',
				icon: '',
				icon_text: 'A',
				state: '',
				sub: [
					{
						id: 5,
						title: 'Sub 1',
						icon: '',
						icon_text: 'C',
						state: 'test'
					},
					{
						id: 6,
						title: 'Sub 2',
						icon: '',
						icon_text: 'C',
						state: 'test'
					},
					{
						id: 5,
						title: 'Sub 3',
						icon: '',
						icon_text: 'C',
						state: 'test'
					},
					{
						id: 6,
						title: 'Sub 4',
						icon: '',
						icon_text: 'C',
						state: 'test'
					}
				]
			}
        ];
    }

// ============================================== ANIMATION AREA ==============================================
    toggleFocusClick() {
    	console.log('make change');
        if (this.smDevice) {
            this.toggle = false;
        } else {
            this.state = this.toggle ? 'active' : (this.state === 'active' ? 'inactive' : 'active');
            this.toggle = !this.toggle;
        }
    }

    toggleFocusHover(mouseLeave: boolean = true) {
        if (mouseLeave) { this.hideAllItem(); }

        if (!this.smDevice) {
            if (mouseLeave) {
                this.state = this.toggle ? 'inactive' : 'active';
            } else {
                this.state = 'active';
            }
        }
    }

    @HostListener('window:resize')
    onResize() {
        this.hideAllItem();

        this.smDevice = this.isSmallDevice();

        if (this.smDevice) {
            this.state = 'hidden';
        } else {
            this.state = 'active';
            this.toggle = false;
        }

        this.innerHeight = window.innerHeight;
    }
// ========================================== END OF ANIMATION AREA ===========================================


// ============================================ SUB MENU FUNCTION =============================================
    hoverSideMenu(event, item) {
        if (this.smDevice) { return false; }

        if (item.sub && (item.sub.length > 0)) {

            if (this.subData !== item.sub) {
                this.display = 'none';
                this.subDisplay = 'none';
            }

            const timing = (this.toggle && this.state !== 'active') ? 500 : 50;

            setTimeout(() => {
                this.subData = item.sub;

                this.topInt = event.target.offsetTop - this.scrollTop + 64;

                const newHeight = item.sub.length * this.px;
                const diff = this.innerHeight - this.topInt;

                if (newHeight > diff) {
                    this.topInt = this.topInt - newHeight + diff;
                    if (this.topInt < 0) {
                        this.topInt = 0;
                    }
                }

                if (newHeight < this.innerHeight) {
                    this.maxHeight = newHeight + 'px';
                } else {
                    this.maxHeight = (this.innerHeight - this.topInt) + 'px';
                }

                this.top = this.topInt + 'px';
                this.display = this.state === 'active' ? 'block' : 'none';
            }, timing);

        } else {
            this.display = 'none';
            this.subDisplay = 'none';
        }
    }

    scrollEvent(event) {
        this.scrollTop = event.target.scrollTop;
    }

    mouseLeave(e) {
        if (this.subDisplay !== 'block') {
            this.display = 'none';
        }
    }

    // width < 768px
    clickSideMenu(e, item) {
        if (!this.smDevice) { return false; }
        if (item.sub && item.sub.length > 0 && !this.smDisplay[item.id]) {
            this.smDisplay = [false];
            this.smDisplay[item.id] = true;
            this.smSubDisplay = [false];
        } else {
            this.smDisplay = [false];
            this.smSubDisplay = [false];
        }
    }
// ========================================= END OF SUB MENU FUNCTION =========================================


// ========================================== SUB SUB MENU FUNCTION ===========================================
    subHoverSideMenu(event, item) {
        if (this.smDevice) { return false; }

        if (item.is_child && item.sub && (item.sub.length > 0)) {

            if (this.subSubData !== item.sub) {
                this.subDisplay = 'none';
            }

            setTimeout(() => {
                this.subSubData = item.sub;

                let newTop = event.target.offsetTop - this.subScrollTop + this.topInt;

                const newHeight = item.sub.length * this.px;
                const diff = this.innerHeight - newTop;

                if (newHeight > diff) {
                    newTop = newTop - newHeight + diff;
                    if (newTop < 0) {
                        newTop = 0;
                    }
                }

                if (newHeight < this.innerHeight) {
                    this.subMaxHeight = newHeight + 'px';
                } else {
                    this.subMaxHeight = (this.innerHeight - newTop) + 'px';
                }

                this.subTop = newTop + 'px';
                this.subDisplay = (this.display === 'block') ? 'block' : 'none';
                this.subLeft = (event.target.offsetWidth + 240) + 'px';
            }, 50);

        } else {
            this.subDisplay = 'none';
        }
    }

    subScrollEvent(event) {
        this.subScrollTop = event.target.scrollTop;
    }

    subMouseLeave(e) {
        this.subDisplay = 'none';
    }

    // width < 768px
    clickSubSideMenu(e, item) {
        if (!this.smDevice) { return false; }
        if (item.sub && item.sub.length > 0 && !this.smSubDisplay[item.id]) {
            this.smSubDisplay = [false];
            this.smSubDisplay[item.id] = true;
        } else {
            this.smSubDisplay = [false];
        }
    }
// ======================================= END OF SUB SUB MENU FUNCTION =======================================

    hideAllItem() {
        this.display = 'none';
        this.subDisplay = 'none';
        this.smDisplay = [false];
        this.smSubDisplay = [false];
    }

    isSmallDevice() {
        if (window.innerWidth <= 767) {
            return true;
        } else {
            return false;
        }
    }
}
