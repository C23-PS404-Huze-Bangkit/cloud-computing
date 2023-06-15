const mapDBToModel = ({
    id,
    name,
    species,
    breed,
    description,
    created_at,
    updated_at,
    owner,
    image_url,
    image_name,
}) => ({
    id,
    name,
    species,
    breed,
    description,
    createdAt: created_at,
    updatedAt: updated_at,
    owner,
    imageUrl: image_url,
    imageName: image_name,
});

module.exports = { mapDBToModel };