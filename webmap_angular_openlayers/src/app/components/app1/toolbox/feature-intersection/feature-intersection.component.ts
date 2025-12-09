import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
    selector: 'app-feature-intersection',
    imports: [MatButtonModule, MatIconModule, MatTooltipModule],
    templateUrl: './feature-intersection.component.html',
    styleUrl: './feature-intersection.component.scss'
})
export class FeatureIntersectionComponent {

}
