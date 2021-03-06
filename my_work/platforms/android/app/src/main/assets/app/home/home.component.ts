import { ViewChild, NgZone } from "@angular/core";
import { RadSideDrawerComponent, SideDrawerType } from "nativescript-ui-sidedrawer/angular";
import { Component, OnInit } from "@angular/core";
import { DatabaseService } from "../database/sqlite.service";
import { RouterExtensions } from "nativescript-angular/router";
import { alert, LoginService, User } from "../shared";
import { getString } from "application-settings";
import { GestureEventData } from "tns-core-modules/ui/gestures";
import { ListViewEventData, RadListView } from "nativescript-ui-listview";
import { View, idProperty } from "tns-core-modules/ui/core/view";
import { GridLayout } from "tns-core-modules/ui/layouts/grid-layout";
import { SwipeGestureEventData } from "tns-core-modules/ui/gestures";
import { Router, NavigationExtras } from "@angular/router"
import * as dialogs from "tns-core-modules/ui/dialogs";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    infoMetro: Array<Object> = [];
    db: any;
    dateOfPurchase: Date;
    total_amount: number;
    expiration: Date;
    user_id: string;
    type: string;
    metrocard_id: number;

    layoutWidth: number = 400;
    layoutHeight: number = 300;


    @ViewChild(RadSideDrawerComponent) public drawerComponent: RadSideDrawerComponent;
    
    mainContentText: string = "SideDrawer for NativeScript can be easily setup in the XML definition of your page by defining main- and drawer-content. The component"
        + " has a default transition and position and also exposes notifications related to changes in its state. Swipe from left to open side drawer.";
    onOpenDrawerTap() {
        this.drawerComponent.sideDrawer.showDrawer();
    }
    onCloseDrawerTap() {
        this.drawerComponent.sideDrawer.closeDrawer();
    }

    constructor(
        private routerExtensions: RouterExtensions,
        private userService: LoginService,
        private database: DatabaseService,
        private ngzone: NgZone
    ) {
        this.user_id = getString("user_id");
    }

    ngOnInit(): void {
        this.selectCard();
    }

    selectCard(){
        this.infoMetro = [];
        this.database.getdbConnection().then(
            db => { db.all("SELECT * FROM metrocard WHERE user_id = ?",[this.user_id])
        .then( rows => {
            for(var row in rows){
                this.infoMetro.push({ id: rows[row][0], type: rows[row][1], date: rows[row][2], amount: rows[row][3], expiration: rows[row][4] });
            }
            this.db = db;
            
        },
            error => {
                console.log("SELECT ERROR", error);
            }
        ).then((id) => {
            this.metrocard_id = id;
        });
        }
        );
    }

    onItemTap(args) {
        //args.index
      
    }


    onLongPress(args:ListViewEventData){

    
    }
    


}


