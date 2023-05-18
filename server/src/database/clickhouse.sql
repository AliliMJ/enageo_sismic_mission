CREATE TABLE charges
(
    ressource String,
    quantite UInt32,
    coutTotal UInt32,
    projet String,
    chantier String
)
ENGINE = MergeTree
PRIMARY KEY (ressource, projet, chantier)