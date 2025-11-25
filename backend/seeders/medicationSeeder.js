"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Delete all existing records first
    await queryInterface.bulkDelete("Medications", null, {});

    // Then insert fresh data
    await queryInterface.bulkInsert("Medications", [
      {
        name: "TDF/3TC/DTG",
        dosage: "1 tablet once daily",
        description:
          "First-line ART regimen combining Tenofovir, Lamivudine, and Dolutegravir. Preferred for adults and adolescents.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "ABC/3TC/DTG",
        dosage: "1 tablet once daily",
        description:
          "Alternative first-line regimen for patients with renal issues or intolerance to Tenofovir.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "TDF/3TC/EFV",
        dosage: "1 tablet at night",
        description:
          "Older first-line regimen using Efavirenz. Still used when Dolutegravir is not available or contraindicated.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "AZT/3TC/NVP",
        dosage: "1 tablet twice daily",
        description:
          "Alternative regimen used when Tenofovir is unsuitable. Contains Zidovudine, Lamivudine, and Nevirapine.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "AZT/3TC",
        dosage: "1 tablet twice daily",
        description:
          "Backbone regimen for second-line therapy when combined with a protease inhibitor.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "LPV/r",
        dosage: "2 tablets twice daily",
        description:
          "Lopinavir/ritonavir. Protease inhibitor used for second-line ART regimens.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "ATV/r",
        dosage: "1 tablet once daily",
        description:
          "Atazanavir/ritonavir. Second-line protease inhibitor used when switching from first-line therapy.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "DTG (Dolutegravir)",
        dosage: "50 mg once daily",
        description:
          "Integrase inhibitor widely recommended for first-line treatment. Often used in fixed-dose combinations.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "EFV (Efavirenz)",
        dosage: "600 mg at night",
        description:
          "NNRTI used in older first-line ART regimens. Can cause vivid dreams or dizziness.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "3TC (Lamivudine)",
        dosage: "300 mg once daily",
        description:
          "NRTI component used in most first-line and second-line ART regimens.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "TDF (Tenofovir)",
        dosage: "300 mg once daily",
        description:
          "NRTI used as backbone in modern first-line regimens. Avoid in renal impairment.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Medications", null, {});
  },
};
