import { Component, Input, Output, EventEmitter, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ApiInterface } from '../../../services';
import { Station } from '../../../model';
import * as L from 'leaflet';

@Component({
    selector: 'n52-station-map-selector',
    templateUrl: './station-map-selector.component.html'
})
export class StationMapSelectorComponent implements OnChanges, OnInit {

    @Input()
    public mapId: string;

    @Input()
    public serviceUrl: string;

    @Input()
    public filter: any;

    @Input()
    public mapLayers: any;

    @Input()
    public cluster: any;

    @Output()
    public onStationSelected: EventEmitter<Station> = new EventEmitter<Station>();

    public loading: boolean;
    public noResultsFound: boolean;
    private map;
    private layer;

    private icon = L.icon({
        iconUrl: require('leaflet/dist/images/marker-icon.png'),
        iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
        shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    constructor(
        private apiInterface: ApiInterface
    ) { }

    public ngOnInit(): void {
        this.initMap();
    }

    public ngOnChanges(changes: SimpleChanges): any {
        this.initMap(() => {
            this.noResultsFound = false;
            this.loading = true;
            if (this.layer) this.map.removeLayer(this.layer);
            this.apiInterface.getStations(this.serviceUrl, this.filter)
                .subscribe((res) => {
                    this.layer = L.markerClusterGroup({
                        animate: false
                    });
                    if (res instanceof Array && res.length > 0) {
                        res.forEach((entry) => {
                            const marker = L.marker([entry.geometry.coordinates[1], entry.geometry.coordinates[0]], {
                                icon: this.icon
                            });
                            marker.on('click', () => {
                                this.onStationSelected.emit(entry);
                            });
                            this.layer.addLayer(marker);
                        });
                        this.layer.addTo(this.map);
                        this.map.fitBounds(this.layer.getBounds());
                    } else {
                        this.noResultsFound = true;
                    }
                    this.map.invalidateSize();
                    this.loading = false;
                });
        });
    }

    private initMap(callback?: () => void) {
        if (!this.map) {
            setTimeout(() => {
                if (!this.map) {
                    this.map = L.map(this.mapId, {}).setView([51.505, -0.09], 13);
                    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    }).addTo(this.map);
                }
                if (callback) callback();
            }, 100);
        } else {
            if (callback) callback();
        }
    }
}
