import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { SearchService } from '../services/search.service';
import { GroupService } from '../services/group.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router,
    private searchService: SearchService,
    private groupService: GroupService) { }

  friendResults: any;
  groupResults: any;

  ngOnInit() {
    this.friendResults = new Array();
 
    this.router.events.subscribe(x => {
      if (x instanceof NavigationEnd) {
        this.getSearchResults();
      }
    });

    this.getSearchResults();
  }

  getSearchResults() {
    let query = this.route.snapshot.params['query'];
    this.searchService.search(query)
      .subscribe(x => {
        this.friendResults = x; 
      });
    this.groupService.getGroups(query)
      .subscribe(x => {
        this.groupResults = x;
      });
  }

  displayNoResults(list) {
    if (list && list.length != 0) {
      return false;
    } else {
      return true;
    }
  }

}
