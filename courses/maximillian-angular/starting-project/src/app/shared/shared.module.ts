import { NgModule } from "@angular/core";

import { CardComponent } from "./card/card.component";

@NgModule({
    declarations: [CardComponent], //* used internally
    exports: [CardComponent] //* exports from this module
})
export class SharedModule {

}
