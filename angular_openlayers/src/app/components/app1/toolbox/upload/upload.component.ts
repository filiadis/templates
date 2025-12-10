import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MapService } from '../../services/map.service';
import KML from 'ol/format/KML';
import { Feature } from 'ol';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import { LanguageService } from '../../../../languageService/language.service';

@Component({
    selector: 'app-upload',
    imports: [MatButtonModule, MatIconModule, MatTooltipModule],
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.scss', '../toolbox.component.scss']
})
export class UploadComponent implements OnInit {

  lang: string = '';

  el: string = 'Φόρτωση KML'

  en: string = 'Upload KML'

  langSubscription: any;

  private kmlLayer: any | null = null;

  constructor(private mapService: MapService, private languageSrv: LanguageService) {
    this.languageSrv = languageSrv
  }

  ngOnInit(): void {
    this.langSubscription = this.languageSrv.language$.subscribe(lang => {
      this.lang = lang;
    });

  }


  onSelectKMLFile() {
    const map = this.mapService?.getMap();
    map.removeLayer(this.kmlLayer);
    const kmlFormat = new KML();
    let input = document.createElement('input');
    input.type = 'file';
    input.accept = '.kml'; // Restrict to only .kml files

    input.onchange = async () => { // Use async/await for cleaner handling
      if (input.files && input.files.length > 0) {
        let file = input.files[0];

        try {
          const reader = new FileReader();
          reader.readAsText(file); // Read file content as text

          reader.onload = async (event) => {
            const kmlString = event.target?.result as string;
            const features = kmlFormat.readFeatures(kmlString);

            // Create a new Vector Layer from features
            const vectorSource = new VectorSource({ features });
            const vectorLayer = new VectorLayer({ source: vectorSource });

            // Add the layer to the map
            map?.addLayer(vectorLayer);
            this.kmlLayer = vectorLayer; // Store the layer reference

            // Get the extent of the layer features
            const layerExtent = vectorSource.getExtent();

            // Zoom the map to the extent (if extent is valid)
            if (layerExtent) {
              map?.getView().fit(layerExtent);
            } else {
              console.warn('KML layer has no extent to zoom to.');
            }
          };

          reader.onerror = (error) => {
            console.error('Error reading KML file:', error);
          };
        } catch (error) {
          console.error('Error processing KML file:', error);
        }
      }
    };
    input.click();
  }


  tooltipText() {
    if (this.lang === 'el') {
      return this.el
    } else if (this.lang === 'en') {
      return this.en
    } else {
      return '';
    }
  }


}
