export const formatDate = (date) => {
    return date.toLocaleString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });
};

export const formatRatio = (unit) => `Dinars/ ${unit}`;

export const formatPrice = () => 'Dinars';
