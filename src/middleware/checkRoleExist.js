


exports.checkRolesExist = (req, res, next) => {
	const ROLES = ["admin", 'customer', 'moderator'];

	if (req.body.roles) {

		let array = req.body.roles;
		array.forEach(function (role) {
			if (!ROLES.includes(role)) {
				return res.json({ role })
			}
		});
		next();

	}
}