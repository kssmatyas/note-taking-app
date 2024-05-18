import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Note } from '../../models/note.model';
import { NoteService } from '../../services/note.service';
import { DeleteNoteDialogComponent } from '../delete-note-dialog/delete-note-dialog.component';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit {
  notes: Note[] = [];
  filteredNotes: Note[] = [];

  constructor(
    private noteService: NoteService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadNotes();
    this.filteredNotes = this.notes;
  }

  async loadNotes () {
    this.notes = await this.noteService.getAllNotes();
  }

  openDeleteDialog(note: Note): void {
    const dialogRef = this.dialog.open(DeleteNoteDialogComponent, {
      width: '350px',
      data: { noteTitle: note.title }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteNote(note.id!);
      }
    });
  }

  async deleteNote(id: string): Promise<void> {
    if (await this.noteService.deleteNote(id)) {
      this.snackBar.open('Note deleted', 'Close', { duration: 3000 });
      this.notes = await this.noteService.getAllNotes();
      this.filterNotes('');
    } else {
      this.snackBar.open('Failed to delete note', 'Close', { duration: 3000 });
    }
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.filterNotes(input?.value || '');
  }

  filterNotes(query: string): void {
    const lowerQuery = query.toLowerCase();
    this.filteredNotes = this.notes.filter(note =>
      note.title.toLowerCase().includes(lowerQuery) || note.content.toLowerCase().includes(lowerQuery)
    );
  }
}
