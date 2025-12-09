import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ToolboxDialogsService } from '../../services/dialogs/toolbox-dialogs.service';


@Component({
    selector: 'app-feature-info',
    imports: [MatButtonModule, MatIconModule, MatTooltipModule],
    templateUrl: './feature-info.component.html',
    styleUrl: './feature-info.component.scss'
})
export class FeatureInfoComponent {

  constructor(private srv: ToolboxDialogsService) { }

  onClick() {
    this.srv.toggleBtnValue("featureInfo");

  }
}
