alter table businesses
  add column if not exists neighborhood text;

comment on column businesses.neighborhood is
  'Fort Wayne area/neighborhood (e.g. Downtown, Aboite, New Haven)';
