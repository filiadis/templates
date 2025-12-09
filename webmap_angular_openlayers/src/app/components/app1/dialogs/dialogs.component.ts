import { Component } from '@angular/core';
import { PrintDialogComponent } from './print-dialog/print-dialog.component';
import { BasemapsDialogComponent } from './basemaps-dialog/basemaps-dialog.component';
import { LocationDialogComponent } from './location-dialog/location-dialog.component';
import { MeasureLineDialogComponent } from './measure-line-dialog/measure-line-dialog.component';
import { MeasureAreaDialogComponent } from './measure-area-dialog/measure-area-dialog.component';
import { ThematicMapDialogComponent } from './thematic-map-dialog/thematic-map-dialog.component';
import { FeatureInfoDialogComponent } from './feature-info-dialog/feature-info-dialog.component';
import { UnitEvalDialogComponent } from "./unit-eval-dialog/unit-eval-dialog.component";

@Component({
    selector: 'app-dialogs',
    imports: [PrintDialogComponent, BasemapsDialogComponent,
        LocationDialogComponent, MeasureLineDialogComponent, MeasureAreaDialogComponent,
        ThematicMapDialogComponent, FeatureInfoDialogComponent, UnitEvalDialogComponent],
    templateUrl: './dialogs.component.html',
    styleUrl: './dialogs.component.scss'
})
export class DialogsComponent {

}
