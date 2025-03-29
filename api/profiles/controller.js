const UserProfile = require("./model.js");

const getProfiles = async (req, res) => {
    const { location, website } = req.query;

    const searchFilter = {};
    if (location) {
        searchFilter["information.location"] = location;
    }
    if (website) {
        searchFilter["information.website"] = website;
    }

    try {
        const profiles = await UserProfile.find(searchFilter);
        res.json(profiles);
    } catch (err) {
        res.status(500).json({ error: "Erreur lors de la récupération des profils" });
    }
}

const getProfile = async (req, res) => {
    try {
        const profile = await UserProfile.findById(req.params.id);
        res.json(profile);
    } catch (err) {
        res.status(500).json({ error: "Erreur lors de la récupération du profil" });
    }
}

const createProfile = async (req, res) => {
    try {
        const newProfile = new UserProfile(req.body);
        await newProfile.save();
        res.status(201).json(newProfile);
    } catch (err) {
        res.status(500).json({ error: "Erreur lors de la création du profil" });
    }
}

const updateProfile = async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    try {
        await UserProfile.findByIdAndUpdate
            (id, { name, email }, { new: true });
        res.json({ message: "Profil modifié avec succès" });
    } catch (err) {
        res.status(500).json({ error: "Erreur lors de la modification du profil" });
    }
}

const deleteProfile = async (req, res) => {
    const { id } = req.params;
    try {
        await UserProfile.findByIdAndDelete(id);
        res.json({ message: "Profil supprimé avec succès" });
    } catch (err) {
        res.status(500).json({ error: "Erreur lors de la suppression du profil" });
    }
}

const addExperience = async (req, res) => {
    const { id } = req.params;
    const { title, company, dates, description } = req.body;
    try {
        const profile = await User.findById(id);
        profile.experience.push({ title, company, dates, description });
        await profile.save();
        res.json(profile);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de l'ajout de l'experience" });
    }
}

const deleteExperience = async (req, res) => {
    const { id, exp } = req.params;
    try {
        const profile = await User.findById(id);
        const experienceToDelete = profile.experience.id(exp);
        experienceToDelete.remove();
        await profile.save();
        res.json(profile);
    }
    catch (error) {
        res.status(500).json({ error: "Erreur lors de la suppression de l'experience" });
    }
}

const addSkill = async (req, res) => {
    const { id } = req.params;
    const { skill } = req.body;
    try {
        const profile = await User.findById(id);
        profile.skills.push(skill);
        await profile.save();
        res.json(profile);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de l'ajout du skill" });
    }
}

const deleteSkill = async (req, res) => {
    const { id, skill } = req.params;
    try {
        const profile = await User.findById(id);
        const skillToDelete = profile.skills.indexOf(skill);
        profile.skills.splice(skillToDelete, 1);
        await profile.save();
        res.json(profile);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la suppression skill" });
    }
}

const editInformation = async (req, res) => {
    const { id } = req.params;
    const { bio, location, website } = req.body;
    try {
        const profile = await User.findById(id);
        profile.information.bio = bio;
        profile.information.location = location;
        profile.information.website = website;
        await profile.save();
        res.json(profile);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la modification des informations" });
    }
}

module.exports = {
    getProfiles,
    getProfile,
    createProfile,
    updateProfile,
    deleteProfile,
    addExperience,
    deleteExperience,
    addSkill,
    deleteSkill,
    editInformation
};