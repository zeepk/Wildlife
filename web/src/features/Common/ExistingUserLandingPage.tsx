import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from 'app/hooks';
import 'features/Common/common.scss';
import { discordUrl, twitterUrl } from 'utils/constants';
import {
    selectAuthLoading,
    getTodayInfo,
    selectDashboard,
    selectAccountExists,
    selectAccountVillagers,
} from 'features/Common/commonSlice';
import { useHistory } from 'react-router-dom';
import LoadingIcon from 'features/Common/LoadingIcon';
import { IconTemplate } from 'features/Tracking/common/IconTemplate';
import { DateTime } from 'luxon';
import { Carousel } from 'primereact/carousel';
import { Fish, Bug, Sea } from 'features/Tracking/trackingTypes';
import AuthButtons from './Auth/AuthButtons';

export function ExistingUserLandingPage() {
    const history = useHistory();
    const dispatch = useAppDispatch();
    const loading = useAppSelector(selectAuthLoading);
    const dashboard = useAppSelector(selectDashboard);
    const accountExists = useAppSelector(selectAccountExists);
    const accountVillagers = useAppSelector(selectAccountVillagers);
    const villagerIds = accountVillagers ?? [];

    useEffect(() => {
        if (!loading && dashboard?.upcomingBirthdays?.length === 0) {
            dispatch(getTodayInfo());
        }
    }, [dispatch, dashboard?.upcomingBirthdays?.length, loading]);

    if (loading || dashboard?.upcomingBirthdays?.length === 0) {
        return <LoadingIcon fullScreen={true} />;
    }
    const todaysBirthdaysNames = dashboard?.todaysBirthdays?.map(v => v.name);

    const responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 3,
            numScroll: 3,
        },
        {
            breakpoint: '768px',
            numVisible: 2,
            numScroll: 2,
        },
        {
            breakpoint: '560px',
            numVisible: 1,
            numScroll: 1,
        },
    ];

    const critterTemplate = (c: Fish | Bug | Sea) => (
        <div className="critter p-d-flex p-flex-column p-ai-center p-m-2">
            <IconTemplate uri={c.icon_uri} altText={c.name} />
            {c.name}
        </div>
    );

    return (
        <div className="container--existing p-d-flex p-flex-column p-p-6">
            <div className="welcome p-mb-2">
                <p className="p-m-0">
                    {accountExists ? 'Welcome Back!' : 'Hello there!'}
                </p>
                <div className="p-mb-4">
                    {!accountExists && <AuthButtons checkLogin={false} />}
                </div>
            </div>
            <div className="divider p-mb-6" />
            <div className="container--dashboard p-d-flex p-flex-row p-flex-wrap p-jc-between">
                <div className="dashboard-left p-d-flex p-flex-wrap p-jc-between">
                    <div className="dashboard-container container--birthdays">
                        <p className="title">Birthdays</p>
                        <div className="birthdays p-px-1">
                            <div className="row todays p-px-3 p-d-flex p-ai-center p-jc-between">
                                <div>Today</div>
                                <div className="p-d-flex p-jc-end">
                                    {dashboard.todaysBirthdays?.length === 0 ? (
                                        <div>None!</div>
                                    ) : (
                                        dashboard.todaysBirthdays.map(v => (
                                            <div
                                                key={v.name}
                                                className={`villager ${
                                                    villagerIds.includes(
                                                        v.ueid
                                                    ) && 'current'
                                                } p-d-flex p-flex-column p-ai-center p-ml-3`}
                                            >
                                                <IconTemplate
                                                    uri={v.icon_uri}
                                                    altText={v.name}
                                                />
                                                <div className="name">
                                                    {v.name}!
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                            <div className="row upcoming p-my-4 p-d-flex p-flex-column p-ai-center p-jc-between">
                                <div>Upcoming</div>
                                <div className="p-d-flex villagers p-pr-3">
                                    {dashboard.upcomingBirthdays?.length ===
                                    0 ? (
                                        <div>None!</div>
                                    ) : (
                                        dashboard.upcomingBirthdays
                                            .filter(
                                                v =>
                                                    !todaysBirthdaysNames.includes(
                                                        v.name
                                                    )
                                            )
                                            .map(v => (
                                                <div
                                                    key={v._id}
                                                    className={`villager ${
                                                        villagerIds.includes(
                                                            v.ueid
                                                        ) && 'current'
                                                    } p-d-flex p-flex-column p-ai-center p-ml-3`}
                                                >
                                                    <IconTemplate
                                                        uri={v.icon_uri}
                                                        altText={v.name}
                                                    />
                                                    <div className="name">
                                                        {v.name}
                                                    </div>
                                                    <div className="name">
                                                        {v.birthday}
                                                    </div>
                                                </div>
                                            ))
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="dashboard-container container--events">
                        <p className="title">Today's Events</p>
                        <div className="p-d-flex p-flex-column p-jc-end">
                            {dashboard.todaysEvents?.length === 0 ? (
                                <div>None!</div>
                            ) : (
                                dashboard.todaysEvents.map(e => {
                                    const endDate = e.endDate
                                        ? `until ${DateTime.fromISO(
                                              e.endDate.toString()
                                          ).toFormat('L/dd')}`
                                        : '';
                                    return (
                                        <div
                                            key={e.name}
                                            className="row event p-d-flex p-flex-row p-jc-between p-py-3 p-ai-center p-mb-3"
                                        >
                                            <div className="name">{e.name}</div>
                                            <div className="date">
                                                {endDate}
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>
                    <div className="dashboard-container container--critters">
                        <p className="title">Available Critters</p>
                        <p className="subtitle">Catch them right now!</p>
                        {dashboard.availableCritters.length > 0 ? (
                            <Carousel
                                value={dashboard.availableCritters}
                                itemTemplate={c => critterTemplate(c)}
                                numVisible={5}
                                numScroll={5}
                                autoplayInterval={3000}
                                circular
                                responsiveOptions={responsiveOptions}
                            />
                        ) : (
                            <div className="p-d-flex p-jc-center p-ai-center">
                                <p className="none">None!</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
