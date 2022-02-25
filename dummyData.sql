	INSERT INTO player (username, password, email, admin) VALUES ('mattm', 'toothyMaw', 'thursday@xhorhas.net', true), 
	('ObiKenobi','password', 'hellothere@naboo.gov', false),('WillingBlam', 'werewolves', 'makingmyway@email.com', false);
	INSERT INTO campaign (joincode, campaignname, dmuserid) VALUES (122, 'Eberron', 1), (66, 'Mandolorian', 2);

	INSERT INTO character (ac, hp, initiativebonus, charactername, level, userid, campaignid) 
	VALUES (16, 55, 3, 'Bardy McBard', 5, 2, 1),
	(17, 192, 0, 'Fjord Stone', 16, 3, 1);

	INSERT INTO monster (ac, initiativebonus, monstername, cr, public) VALUES (25, 22, 'Tarrasque', 17, TRUE);
	INSERT INTO encounter (campaignid, encountername) VALUES (1, 'Gnolls');

	INSERT INTO fight (monsterid, encounterid) VALUES (1,1);
	INSERT INTO playin (userid, campaignid) VALUES (2, 1);