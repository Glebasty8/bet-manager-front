import React, { PureComponent } from 'react';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';

import { withTranslation } from 'src/utils/i18n';
import theme from 'src/theme';

const styles = {
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
};

class AboutUs extends PureComponent {
    render() {
        const { classes, t } = this.props;
        return (
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Typography variant="h1" paragraph>
                    {t('h1')}
                </Typography>
                <p>BetManager – это молодой проект о спорте, вовлекающий опытных людей делиться своими мыслями в данной сфере.</p>

                <p>Наша команда предоставляет описания к актуальным спортивным событиям с элементами определенного прогноза или пути их возможного развития.</p>

                <p>Любой желающий может получить доступ к данной интеллектуальной собственности как бесплатным путем, так и оформив подписку на определенный срок, чтобы расширить собственный ассортимент матчей.</p>

                <p>Основной способ оплаты такой подписки – онлайн-терминал LiqPay. После успешной оплаты пользователь получит доступ к закрытому сектору сайта, где он и сможет ознакомиться с описанием предстоящего спортивного события. Также статья с прогнозом может быть выслана пользователю на электронную почту или Telegram-адрес.</p>

                <p>Возврат средств может быть осуществлен лишь в случае некорректной работы технической стороны сайта.</p>

                <p>Во всех остальных случаях - администрация сайта оставляет за собой право поощрять постоянных пользователей или тех клиентов, которые столкнулись с другого рода проблемами на данном ресурсе. Подобные вопросы решаются в индивидуальном порядке через раздел «Помощь».</p>
                <div className="flex column">
                    <p>Обратная связь:</p>
                    <p>Email: bet.manager.ask@gmail.com</p>
                    <p>Contact number: +380504022248</p>
                </div>
            </main>
        );
    }
}

export default compose(
    withStyles(styles),
    withTranslation(['about-us'])
)(AboutUs);
