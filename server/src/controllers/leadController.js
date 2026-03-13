import {
    createLead,
    findLeads,
    findLeadById,
    updateLead,
    deleteLead,
  } from "../services/leadService.js";
  
  export async function postLead(req, res, next) {
    try {
      const lead = await createLead(req.body);
      res.status(201).json(lead);
    } catch (err) {
      next(err);
    }
  }
  
  export async function getLeads(req, res, next) {
    try {
      const leads = await findLeads();
      res.status(200).json(leads);
    } catch (err) {
      next(err);
    }
  }
  
  export async function getLead(req, res, next) {
    try {
      const lead = await findLeadById(Number(req.params.id));
  
      if (!lead) {
        return res.status(404).json({ error: "Lead not found" });
      }
  
      res.status(200).json(lead);
    } catch (err) {
      next(err);
    }
  }
  
  export async function patchLead(req, res, next) {
    try {
      const lead = await updateLead(Number(req.params.id), req.body);
      res.status(200).json(lead);
    } catch (err) {
      next(err);
    }
  }
  
  export async function removeLead(req, res, next) {
    try {
      await deleteLead(Number(req.params.id));
      res.status(200).json({ message: "Lead deleted" });
    } catch (err) {
      next(err);
    }
  }