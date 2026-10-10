function classificarStatus(statusCode) {
    if (statusCode === 200) {
        return "Sucesso";
    }

    return "Status não mapeado";
}

export {
    classificarStatus
};