/* Goal here is to render each resulting track side by side on a card */

/* Angular */
import { Component, OnInit } from '@angular/core';
import {
    Router,
    ActivatedRoute,
} from '@angular/router';

/* Services */
import { SpotifyService } from '../spotify.service';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {
    query: string;
    results: Object;

    constructor(private spotify: SpotifyService,
                private router: Router,
                private route: ActivatedRoute) {

            /*subscribe to queryParams property that allows us to access query parameters like search term*/
            this.route
                .queryParams
                .subscribe(params => {this.query = params['query'] || '';});
    }

    /* ngOnInit allows us to jump straight into the results if the URL includes a search query */
    ngOnInit(): void {
        this.search();
    }
    
    /* manually telling router to navigate to search route, and providing a query param, then performing actual search */
    submit(query: string): void {
        this.router.navigate(['search'], { queryParams: { query: query } })
        .then(_ => this.search() );
    }
    
    search(): void {
        console.log('this.query', this.query);
        if (!this.query) {
          return;
        }
    
        this.spotify
          .searchTrack(this.query)
          .subscribe((res: any) => this.renderResults(res));
    }

    renderResults(res: any): void {
        this.results = null;
        if (res && res.tracks && res.tracks.items) {
          this.results = res.tracks.items;
        }
    }
}