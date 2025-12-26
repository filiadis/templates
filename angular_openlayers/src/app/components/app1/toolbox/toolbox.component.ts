import { Component } from '@angular/core';
import { ZoomInComponent } from './zoom-in/zoom-in.component';
import { ZoomOutComponent } from './zoom-out/zoom-out.component';
import { GoHomeComponent } from './go-home/go-home.component';
import { LegendToggleComponent } from './legend-toggle/legend-toggle.component';
import { BasemapsComponent } from './basemaps/basemaps.component';
import { MeasureLineComponent } from './measure-line/measure-line.component';
import { MeasureAreaComponent } from './measure-area/measure-area.component';
import { PrintComponent } from './print/print.component';
import { LocationComponent } from './location/location.component';
import { UploadComponent } from './upload/upload.component';
import { FullscreenComponent } from './fullscreen/fullscreen.component';

@Component({
    selector: 'app-toolbox',
    imports: [ZoomInComponent, ZoomOutComponent,
        GoHomeComponent, LegendToggleComponent, BasemapsComponent,
        MeasureLineComponent, MeasureAreaComponent,
        PrintComponent, LocationComponent, UploadComponent,
        FullscreenComponent],
    templateUrl: './toolbox.component.html',
    styleUrl: './toolbox.component.scss'
})
export class ToolboxComponent {

}
