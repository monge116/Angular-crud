import { Component } from '@angular/core';
import {Router} from '@angular/router'
import { ItemService, Item } from '../../services/item.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.css'
})
export class ItemListComponent {

  items: Item[]=[];

  ngOnInit():void{
    this.loadItems();
  }
  
constructor(private itemService: ItemService){}

  loadItems(): void {
    this.itemService.getItems().subscribe({
      next: (data) => {
        this.items = data;
      },
      error: (err) => {
        console.error('Error fetching items:', err);
      }
    });
  }

  deleteItems(id:number) : void{
    this.itemService.deleteItem(id).subscribe({
      next: (data) => {
        this.items = this.items.filter(item => item.id !== id);
      },
      error: (err) => {
        console.error('Error fetching items:', err);
      }
    })
  }
}

