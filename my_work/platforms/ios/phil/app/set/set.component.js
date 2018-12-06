"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var application_settings_1 = require("application-settings");
var shared_1 = require("../shared");
var sqlite_service_1 = require("../database/sqlite.service");
var asda = ["Pre-paid", "Weekly", "Monthly"];
var SetComponent = /** @class */ (function () {
    function SetComponent(routerExtensions, userService, database) {
        this.routerExtensions = routerExtensions;
        this.userService = userService;
        this.database = database;
        this.metrocards = [];
        this.infoMetro = [];
        for (var i = 0; i < asda.length; i++) {
            this.metrocards.push(asda[i]);
        }
        {
            this.user_id = application_settings_1.getString("user_id");
        }
    }
    SetComponent.prototype.ngOnInit = function () {
        this.selectCard();
    };
    SetComponent.prototype.selectedIndexChanged = function (args) {
        var picker = args.object;
        this.picked = this.metrocards[picker.selectedIndex];
    };
    SetComponent.prototype.selectCard = function () {
        var _this = this;
        this.infoMetro = [];
        this.database.getdbConnection().then(function (db) {
            db.all("SELECT id, metrocard_type, dateOfPurchase, total_amount, expiration FROM metrocard WHERE user_id = ?", [_this.user_id])
                .then(function (rows) {
                for (var row in rows) {
                    _this.infoMetro.push({ id: rows[row][0], type: rows[row][1], date: rows[row][2], amount: rows[row][3], expiration: rows[row][4] });
                }
                _this.db = db;
            }, function (error) {
                console.log("SELECT ERROR", error);
            });
        });
    };
    SetComponent.prototype.addcard = function () {
        var _this = this;
        var textField = this.metrocardTextField.nativeElement;
        textField.dismissSoftInput();
        this.db.execSQL("INSERT INTO metrocard (metrocard_type, dateOfPurchase, total_amount, expiration, user_id) VALUES (?,?,?,?,?)", [this.picked, this.dateOfPurchase, this.total_amount, this.expiration, this.user_id]).then(function (id) {
            _this.infoMetro.unshift({ id: id, type: _this.picked, date: _this.dateOfPurchase, amount: _this.total_amount, expiration: _this.expiration });
            console.log(id, _this.picked, _this.dateOfPurchase, _this.total_amount, _this.expiration, _this.user_id);
            _this.picked = "";
            _this.dateOfPurchase = "";
            _this.total_amount = 0;
            _this.expiration = "";
        }, function (error) {
            shared_1.alert('An error occurred while adding an item to your list');
            _this.picked = "";
            _this.dateOfPurchase = "";
            _this.total_amount = 0;
            _this.expiration = "";
        });
        this.routerExtensions.navigate(["/home"], { clearHistory: true });
    };
    __decorate([
        core_1.ViewChild("metrocardTextField"),
        __metadata("design:type", core_1.ElementRef)
    ], SetComponent.prototype, "metrocardTextField", void 0);
    SetComponent = __decorate([
        core_1.Component({
            selector: "Set",
            moduleId: module.id,
            templateUrl: "./set.component.html"
        }),
        __metadata("design:paramtypes", [router_1.RouterExtensions,
            shared_1.LoginService,
            sqlite_service_1.DatabaseService])
    ], SetComponent);
    return SetComponent;
}());
exports.SetComponent = SetComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNldC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxzQ0FBeUU7QUFDekUsc0RBQStEO0FBSS9ELDZEQUFpRDtBQUNqRCxvQ0FBc0Q7QUFDdEQsNkRBQTZEO0FBRzdELElBQUksSUFBSSxHQUFHLENBQUMsVUFBVSxFQUFFLFFBQVEsRUFBQyxTQUFTLENBQUMsQ0FBQztBQU81QztJQW1CSSxzQkFDUSxnQkFBa0MsRUFDbEMsV0FBeUIsRUFDekIsUUFBeUI7UUFGekIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxnQkFBVyxHQUFYLFdBQVcsQ0FBYztRQUN6QixhQUFRLEdBQVIsUUFBUSxDQUFpQjtRQXBCMUIsZUFBVSxHQUFrQixFQUFFLENBQUM7UUFHdEMsY0FBUyxHQUFrQixFQUFFLENBQUM7UUFtQjFCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ25DLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xDLENBQUM7UUFFQyxDQUFDO1lBQ0ssSUFBSSxDQUFDLE9BQU8sR0FBRyxnQ0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3ZDLENBQUM7SUFDVixDQUFDO0lBaEJELCtCQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQWdCTSwyQ0FBb0IsR0FBM0IsVUFBNEIsSUFBSTtRQUM1QixJQUFJLE1BQU0sR0FBZSxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUdELGlD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RUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBcEVxQjtRQUFoQyxnQkFBUyxDQUFDLG9CQUFvQixDQUFDO2tDQUFxQixpQkFBVTs0REFBQztJQWJ2RCxZQUFZO1FBTHhCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsS0FBSztZQUNmLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsc0JBQXNCO1NBQ3RDLENBQUM7eUNBcUI0Qix5QkFBZ0I7WUFDckIscUJBQVk7WUFDZixnQ0FBZTtPQXRCeEIsWUFBWSxDQW9GeEI7SUFBRCxtQkFBQztDQUFBLEFBcEZELElBb0ZDO0FBcEZZLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTGlzdFBpY2tlciB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xpc3QtcGlja2VyXCI7XG5pbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkLCBFbGVtZW50UmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBUZXh0RmllbGQgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS90ZXh0LWZpZWxkXCI7XG5pbXBvcnQgeyBMaXN0Vmlld0V2ZW50RGF0YSwgUmFkTGlzdFZpZXcgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXVpLWxpc3R2aWV3XCI7XG5pbXBvcnQgeyBWaWV3IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvY29yZS92aWV3XCI7XG5pbXBvcnQgeyBnZXRTdHJpbmcgfSBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcbmltcG9ydCB7IGFsZXJ0LCBMb2dpblNlcnZpY2UsIFVzZXIgfSBmcm9tIFwiLi4vc2hhcmVkXCI7XG5pbXBvcnQgeyBEYXRhYmFzZVNlcnZpY2UgfSBmcm9tIFwiLi4vZGF0YWJhc2Uvc3FsaXRlLnNlcnZpY2VcIjtcbiBcbiBcbmxldCBhc2RhID0gW1wiUHJlLXBhaWRcIiwgXCJXZWVrbHlcIixcIk1vbnRobHlcIl07XG4gXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJTZXRcIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vc2V0LmNvbXBvbmVudC5odG1sXCJcbn0pXG5leHBvcnQgY2xhc3MgU2V0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiBcbiAgICBwdWJsaWMgbWV0cm9jYXJkczogQXJyYXk8c3RyaW5nPiA9IFtdO1xuICAgIHB1YmxpYyBwaWNrZWQ6IHN0cmluZztcbiBcbiAgICBpbmZvTWV0cm86IEFycmF5PE9iamVjdD4gPSBbXTtcbiAgICBkYjogYW55O1xuICAgIGRhdGVPZlB1cmNoYXNlOiBzdHJpbmc7XG4gICAgdG90YWxfYW1vdW50OiBudW1iZXI7XG4gICAgZXhwaXJhdGlvbjogc3RyaW5nO1xuICAgIHVzZXJfaWQ6IHN0cmluZztcbiAgICBcbiAgXG4gICAgQFZpZXdDaGlsZChcIm1ldHJvY2FyZFRleHRGaWVsZFwiKSBtZXRyb2NhcmRUZXh0RmllbGQ6IEVsZW1lbnRSZWY7XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZWxlY3RDYXJkKCk7XG4gICAgfVxuIFxuICAgIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucyxcbiAgICBwcml2YXRlIHVzZXJTZXJ2aWNlOiBMb2dpblNlcnZpY2UsXG4gICAgcHJpdmF0ZSBkYXRhYmFzZTogRGF0YWJhc2VTZXJ2aWNlXG4gICAgKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXNkYS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5tZXRyb2NhcmRzLnB1c2goYXNkYVtpXSk7XG4gICAgICAgIH1cbiBcbiAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy51c2VyX2lkID0gZ2V0U3RyaW5nKFwidXNlcl9pZFwiKTtcbiAgICAgICAgICAgICB9XG4gICAgfVxuIFxuICAgIHB1YmxpYyBzZWxlY3RlZEluZGV4Q2hhbmdlZChhcmdzKSB7XG4gICAgICAgIGxldCBwaWNrZXIgPSA8TGlzdFBpY2tlcj5hcmdzLm9iamVjdDtcbiAgICAgICAgdGhpcy5waWNrZWQgPSB0aGlzLm1ldHJvY2FyZHNbcGlja2VyLnNlbGVjdGVkSW5kZXhdO1xuICAgIH1cblxuXG4gICAgc2VsZWN0Q2FyZCgpe1xuICAgICAgICAgICAgdGhpcy5pbmZvTWV0cm8gPSBbXTtcbiAgICAgICAgICAgIHRoaXMuZGF0YWJhc2UuZ2V0ZGJDb25uZWN0aW9uKCkudGhlbihcbiAgICAgICAgICAgICAgICBkYiA9PiB7IGRiLmFsbChcIlNFTEVDVCBpZCwgbWV0cm9jYXJkX3R5cGUsIGRhdGVPZlB1cmNoYXNlLCB0b3RhbF9hbW91bnQsIGV4cGlyYXRpb24gRlJPTSBtZXRyb2NhcmQgV0hFUkUgdXNlcl9pZCA9ID9cIixbdGhpcy51c2VyX2lkXSlcbiAgICAgICAgICAgIC50aGVuKCByb3dzID0+IHtcbiAgICAgICAgICAgICAgICBmb3IodmFyIHJvdyBpbiByb3dzKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmZvTWV0cm8ucHVzaCh7IGlkOiByb3dzW3Jvd11bMF0sIHR5cGU6IHJvd3Nbcm93XVsxXSwgZGF0ZTogcm93c1tyb3ddWzJdLCBhbW91bnQ6IHJvd3Nbcm93XVszXSwgZXhwaXJhdGlvbjogcm93c1tyb3ddWzRdIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmRiID0gZGI7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJTRUxFQ1QgRVJST1JcIiwgZXJyb3IpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgIH1cbiBcbiAgICBhZGRjYXJkKCl7XG4gICBcbiAgICAgICAgICAgbGV0IHRleHRGaWVsZCA9IDxUZXh0RmllbGQ+dGhpcy5tZXRyb2NhcmRUZXh0RmllbGQubmF0aXZlRWxlbWVudDtcbiAgICAgICAgICAgdGV4dEZpZWxkLmRpc21pc3NTb2Z0SW5wdXQoKTtcbiAgIFxuICAgICAgICAgICB0aGlzLmRiLmV4ZWNTUUwoXCJJTlNFUlQgSU5UTyBtZXRyb2NhcmQgKG1ldHJvY2FyZF90eXBlLCBkYXRlT2ZQdXJjaGFzZSwgdG90YWxfYW1vdW50LCBleHBpcmF0aW9uLCB1c2VyX2lkKSBWQUxVRVMgKD8sPyw/LD8sPylcIixcbiAgICAgICAgICAgWyB0aGlzLnBpY2tlZCwgdGhpcy5kYXRlT2ZQdXJjaGFzZSwgdGhpcy50b3RhbF9hbW91bnQsIHRoaXMuZXhwaXJhdGlvbiwgdGhpcy51c2VyX2lkXSkudGhlbihcbiAgICAgICAgICAgICAgIGlkID0+IHtcbiAgICAgICAgICAgICAgICAgICB0aGlzLmluZm9NZXRyby51bnNoaWZ0KHtpZDogaWQsIHR5cGU6IHRoaXMucGlja2VkLCBkYXRlOiB0aGlzLmRhdGVPZlB1cmNoYXNlLCBhbW91bnQ6IHRoaXMudG90YWxfYW1vdW50LCBleHBpcmF0aW9uOiB0aGlzLmV4cGlyYXRpb259KTtcbiAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhpZCwgdGhpcy5waWNrZWQsIHRoaXMuZGF0ZU9mUHVyY2hhc2UsIHRoaXMudG90YWxfYW1vdW50LCB0aGlzLmV4cGlyYXRpb24sIHRoaXMudXNlcl9pZCk7XG4gICAgICAgICAgICAgICB0aGlzLnBpY2tlZCA9IFwiXCI7XG4gICAgICAgICAgICAgIHRoaXMuZGF0ZU9mUHVyY2hhc2UgPSBcIlwiO1xuICAgICAgICAgICAgICAgdGhpcy50b3RhbF9hbW91bnQgPSAwO1xuICAgICAgICAgICAgICAgdGhpcy5leHBpcmF0aW9uID0gXCJcIjtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICAgICBhbGVydCgnQW4gZXJyb3Igb2NjdXJyZWQgd2hpbGUgYWRkaW5nIGFuIGl0ZW0gdG8geW91ciBsaXN0Jyk7XG4gICAgICAgICAgICAgICAgICAgdGhpcy5waWNrZWQgPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0ZU9mUHVyY2hhc2UgPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgIHRoaXMudG90YWxfYW1vdW50ID0gMDtcbiAgICAgICAgICAgICAgICAgICB0aGlzLmV4cGlyYXRpb24gPSBcIlwiO1xuICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvaG9tZVwiXSwgeyBjbGVhckhpc3Rvcnk6IHRydWUgfSk7XG4gICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICBcbiBcbn1cblxuIl19