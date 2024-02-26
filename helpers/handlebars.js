
module.exports = {
    seleccionarSkills : (seleccionadas = [], opciones) => {
        const skills = [
            'HTML', 'CSS3', 'CSSGrid', 'Flexbox', 'JavaScript', 'jQuery', 'Node', 'Angular', 'VueJs', 'ReactJs', 'React Hooks', 'Redux', 'Apollo', 'GrapQl', 'TypeScript', 'PHP', 'Laravel', 'Symfony',
            'Python', 'Django', 'ORM', 'Sequalize', 'Mogoose', 'SQL', 'MVC', 'SQL', 'SAAS', 'WordPress'
        ]

        let html = '';
        skills.forEach(skill => {
            html += `
                <li>${skill}</li>
            `            
        });

        return opciones.fn().html = html
    }
}
