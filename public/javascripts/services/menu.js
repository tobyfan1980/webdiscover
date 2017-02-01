/**
 * Created by gxu on 1/30/17.
 */
'use strict';

angular
    .module('Discover')
    .factory('Menus', ['$http', function($http){
        return {
            default_menu: [
                {title: 'Home', link: 'home', type: "link"},
                {title: 'Contact', link: 'contact', type: "link"},
                {title: 'PowerBI', link: 'powerbi', type: "link"},
                {title: 'iFrame', link: 'iframe', type: "link"}
            ],
            user_menu: [
                {title: 'Home', link: 'home', type: "link"},
                {title: 'Notifications', link: 'note', type: "link"},
                {title: 'About', link: 'about', type: "link"},
                {title: 'Store', link: 'store', type: "link"},
                {title: 'Contact', link: 'contact', type: "link"},
                {title: 'Login', link: 'login', type: "link"}
            ],
            admin_menu: [
                {title: 'Home', link: 'home', type: "link"},
                {title: 'Notifications', link: 'note', type: "link"},
                {title: 'Players', link: '#', type: "dropdown",
                    menus: [
                        {
                            title: 'Player List', link: 'user', type: "link"
                        },
                        {
                            title: 'Rank', link: 'rank', type: "link"
                        }
                    ]
                },
                {title: 'Store', link: 'store', type: "link"},
                {title: 'About', link: 'about', type: "link"},
                {title: 'Contact', link: 'contact', type: "link"},
                {title: 'Admin', link: '#', type: "dropdown",
                    menus: [
                        {
                            title: 'New Notification', link: 'new_note', type: "link"
                        },
                        {
                            title: 'Settings', link: 'settings', type: "link"
                        },
                        {
                            title: 'Logout', link: 'logout', type: "link"
                        }
                    ]
                }
            ]
        }
    }]);
