/*
 * Copyright (c) 2011-2013 Lp digital system
 *
 * This file is part of BackBuilder5.
 *
 * BackBuilder5 is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * BackBuilder5 is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with BackBuilder5. If not, see <http://www.gnu.org/licenses/>.
 */
define(["tb.core"], function (bbCore) {
    'use strict';

    /**
     * Register every routes of content application into bbCore.routeManager
     */
    bbCore.RouteManager.registerRoute("content", {
        prefix: "appContent",
        routes: {
            "name": {
                url: "/home/harris", //when a prefix can be found prefix/home/harris
                action: "MainController:home"
            },

            "params": {
                url: "/params",
                action: "HomeController:params"
            },

            "list": {
                url: "/showlist/:page",
                action: "MainController:list"
            }
        }
    });
});
