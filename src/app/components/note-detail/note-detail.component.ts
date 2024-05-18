import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Note } from '../../models/note.model';
import { NoteService } from '../../services/note.service';

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.css']
})
export class NoteDetailComponent implements OnInit {
  note?: Note;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private noteService: NoteService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadNote();
  }

  async loadNote() {
    const noteId = this.route.snapshot.paramMap.get('id');
    this.note = await this.noteService.getNoteById(noteId!);
  }

  async deleteNote(): Promise<void> {
    if (this.note && await this.noteService.deleteNote(this.note.id!)) {
      this.snackBar.open('Note deleted', 'Close', { duration: 3000 });
      this.router.navigate(['/']);
    } else {
      this.snackBar.open('Failed to delete note', 'Close', { duration: 3000 });
    }
  }
}
