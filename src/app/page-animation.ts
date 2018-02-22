import { trigger, state, style, transition, animate, keyframes } from '@angular/core';

export const pageTransition =
    [
        trigger('animateWidth1', [
            state('hidden', style({
                width: '0px',
                display: 'none'
            })),
            state('active', style({
                width: '240px'
            })),
            state('inactive', style({
                width: '65px'
            })),
            transition('* => active', animate('200ms ease-in')),
            transition('* => inactive', animate('200ms ease-out')),
            transition('* => hidden', animate('200ms ease-out'))
        ]),

        trigger('animateWidth2', [
            state('active', style({
                width: '220px'
            })),
            state('inactive', style({
                width: '45px'
            })),
            transition('* => active', animate('200ms ease-in')),
            transition('* => inactive', animate('200ms ease-out'))
        ]),

        trigger('animateOpacity', [
            state('active', style({
                opacity: 1
                // transform: 'translateX(0)'
            })),
            state('inactive', style({
                opacity: 0
                // transform: 'translateX(-240px)'
            })),
            transition('* => active', animate('200ms ease-in')),
            transition('* => inactive', animate('200ms ease-out'))
        ]),

        trigger('animateUnOpacity', [
            state('active', style({
                opacity: 0
                // transform: 'translateX(-240px)'
            })),
            state('inactive', style({
                opacity: 1
                // transform: 'translateX(0)'
            })),
            transition('* => active', animate('200ms ease-out')),
            transition('* => inactive', animate('200ms ease-in'))
        ])
    ];