import {
    createCompany,
    findCompanies,
    findCompanyById,
    updateCompany,
    deleteCompany,
  } from "../services/companyService.js";
  
  export async function postCompany(req, res, next) {
    try {
      const company = await createCompany(req.body);
      res.status(201).json(company);
    } catch (err) {
      next(err);
    }
  }
  
  export async function getCompanies(req, res, next) {
    try {
      const companies = await findCompanies();
      res.status(200).json(companies);
    } catch (err) {
      next(err);
    }
  }
  
  export async function getCompany(req, res, next) {
    try {
      const company = await findCompanyById(Number(req.params.id));
  
      if (!company) {
        return res.status(404).json({ error: "Company not found" });
      }
  
      res.status(200).json(company);
    } catch (err) {
      next(err);
    }
  }
  
  export async function patchCompany(req, res, next) {
    try {
      const company = await updateCompany(Number(req.params.id), req.body);
      res.status(200).json(company);
    } catch (err) {
      next(err);
    }
  }
  
  export async function removeCompany(req, res, next) {
    try {
      await deleteCompany(Number(req.params.id));
      res.status(200).json({ message: "Company deleted" });
    } catch (err) {
      next(err);
    }
  }