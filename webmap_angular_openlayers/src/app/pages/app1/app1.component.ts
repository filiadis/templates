import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MapComponent } from '../../components/app1/map/map.component';
import { NavbarComponent } from '../../components/app1/navbar/navbar.component';
import { ToolboxComponent } from '../../components/app1/toolbox/toolbox.component';
import { DialogsComponent } from '../../components/app1/dialogs/dialogs.component';
import { CoordsComponent } from '../../components/app1/coords/coords.component';
import { SplashScreenComponent } from '../../components/app1/splash-screen/splash-screen.component';
import { MetadataDialogComponent } from '../../components/app1/dialogs/metadata-dialog/metadata-dialog.component';

@Component({
    selector: 'app-app1',
    imports: [MapComponent, NavbarComponent, ToolboxComponent,
        DialogsComponent, CoordsComponent,
        SplashScreenComponent
    ],
    templateUrl: './app1.component.html',
    styleUrl: './app1.component.scss'
})
export class App1Component {


}
