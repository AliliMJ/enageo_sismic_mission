

-- C4
delimiter $$
CREATE TRIGGER trg_add_projet
BEFORE INSERT ON projet
FOR EACH ROW
BEGIN
   if (select role from utilisateur where id = new.creeParID) not in('CHEF_MISSION') then 
   signal sqlstate '45000' SET MESSAGE_TEXT = 'Permission denied for creating this project';
   end if;
END;$$

-- C2, C3 

delimiter $$
CREATE TRIGGER trg_add_mission
BEFORE INSERT ON Mission
FOR EACH ROW
BEGIN
   if (select role from utilisateur where id = new.chefTerrainID) != 'CHEF_TERRAIN' then 
   signal sqlstate '45000' SET MESSAGE_TEXT = 'Permission denied, user does not possess the appropriate role';
   end if;

   if (select role from utilisateur where id = new.chefMissionID) != 'CHEF_MISSION' then 
   signal sqlstate '45000' SET MESSAGE_TEXT = 'Permission denied, user does not possess the appropriate role';
   end if;
END;$$

-- C15
delimiter $$
CREATE TRIGGER trg_update_user_role
BEFORE UPDATE ON utilisateur
FOR EACH ROW
BEGIN
   if(new.role != old.role and exists(select * from mission m where m.chefMissionID = old.id or m.chefTerrainID=old.id)) then 
        signal sqlstate '45000' SET MESSAGE_TEXT = 'Cannot change role, user already involved with missions';
   end if;
END;$$
