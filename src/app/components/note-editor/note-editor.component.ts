import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Note } from '../../models/note.model';
import { NoteService } from '../../services/note.service';

@Component({
  selector: 'app-note-editor',
  templateUrl: './note-editor.component.html',
  styleUrls: ['./note-editor.component.css']
})
export class NoteEditorComponent implements OnInit {
  noteForm: FormGroup;
  note?: Note;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private noteService: NoteService,
    private fb: FormBuilder
  ) {
    this.noteForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      content: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadNote();
  }

  async loadNote() {
    const noteId = this.route.snapshot.paramMap.get('id');
    if (noteId) {
      this.note = await this.noteService.getNoteById(noteId);


      if (this.note) {
        this.noteForm.patchValue({
          title: this.note.title,
          content: this.note.content
        });
      }
    }
  }

  

  saveNote(): void {
    if (this.noteForm.invalid) {
      return;
    }

    const { title, content } = this.noteForm.value;

    if (this.note) {
      this.noteService.updateNote(this.note.id!, title, content);
    } else {
      this.noteService.createNote(title, content);
    }

    this.router.navigate(['/']);
  }

  get title() {
    return this.noteForm.get('title');
  }

  get content() {
    return this.noteForm.get('content');
  }
}
