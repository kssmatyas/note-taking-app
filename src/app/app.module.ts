import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

// Angular Material modulok
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { DatePipe } from '@angular/common';
import { AppComponent } from './app.component';
import { DeleteNoteDialogComponent } from './components/delete-note-dialog/delete-note-dialog.component';
import { LoginComponent } from './components/login/login.component';
import { NoteDetailComponent } from './components/note-detail/note-detail.component';
import { NoteEditorComponent } from './components/note-editor/note-editor.component';
import { NoteListComponent } from './components/note-list/note-list.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './services/authguard';
import { FirebaseService } from './services/firebase.service';
import { NoteService } from './services/note.service';




const appRoutes: Routes = [
  { path: '', component: NoteListComponent, canActivate: [AuthGuard] },
  { path: 'note/:id', component: NoteDetailComponent, canActivate: [AuthGuard] },
  { path: 'edit/:id', component: NoteEditorComponent, canActivate: [AuthGuard] },
  { path: 'new', component: NoteEditorComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
];

@NgModule({
  declarations: [
    AppComponent,
    NoteListComponent,
    NoteDetailComponent,
    NoteEditorComponent,
    DeleteNoteDialogComponent,
    LoginComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatSnackBarModule,
    MatDialogModule,
    MatTooltipModule,
    FlexLayoutModule,
  ],
  providers: [NoteService, FirebaseService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {
  
}
