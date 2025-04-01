const router = require("express").Router();
const controller = require("./api/profiles/controller.js");


router.get("/profiles", controller.getProfiles);
router.get("/profiles/:id", controller.getProfile);
router.post("/profiles", controller.createProfile);
router.put("/profiles/:id", controller.updateProfile);
router.delete("/profiles/:id", controller.deleteProfile);
router.post("/profiles/:id/experience", controller.addExperience);
router.delete("/profiles/:id/experience/:expId", controller.deleteExperience);
router.post("/profiles/:id/skills", controller.addSkill);
router.delete("/profiles/:id/skills/:skill", controller.deleteSkill);
router.put("/profiles/:id/information", controller.editInformation);

router.post("/profiles/:id/friends/:friendId", controller.addFriend);
router.delete("/profiles/:id/friends/:friendId", controller.removeFriend);
router.get("/profiles/:id/with-friends", controller.getProfileWithFriends);

module.exports = router;