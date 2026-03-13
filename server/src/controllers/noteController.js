import { createNote, findNotesByLeadId } from "../services/noteService.js";

export async function postNote(req, res, next) {
  try {
    const note = await createNote(Number(req.params.id), req.body);
    res.status(201).json(note);
  } catch (err) {
    next(err);
  }
}

export async function getNotes(req, res, next) {
  try {
    const notes = await findNotesByLeadId(Number(req.params.id));
    res.status(200).json(notes);
  } catch (err) {
    next(err);
  }
}