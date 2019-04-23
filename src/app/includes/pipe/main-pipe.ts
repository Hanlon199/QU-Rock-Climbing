import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";

import {sortPipe} from "./sortPipe";

@NgModule({
  declarations:[sortPipe], 
  imports:[CommonModule],
  exports:[sortPipe] 
})

export class MainPipe{}