# Vidya Tilak — Lead Management Readiness

Review date: 2026-10-08

The static website captures structured enquiry fields and prepares an email to the configured team address. It does **not** claim that a central CRM is connected. A secure backend/CRM connector must be configured by the organisation before production multi-user lead management is considered active.

## Minimum lead record

- name
- email
- phone
- qualification
- year_of_passing
- admission_stage
- programme_interested
- study_mode
- preferred_university
- location
- enquiry_source
- page_url
- submitted_at
- consent
- consent_timestamp
- assigned_counsellor
- status
- next_follow_up
- final_outcome

## Suggested statuses

New → Contacted → Qualified → Options Shared → Application Started → Application Submitted → Follow-up Required → Closed / Not Proceeding

## Security

Do not store passwords, payment-card details or unnecessary sensitive personal information in the lead record. Restrict CRM access by role, keep an audit trail, define retention/deletion rules and use HTTPS plus a secure server-side integration.
