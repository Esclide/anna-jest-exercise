import { Container } from 'typedi'
import {HomePage as POHomePage} from './lib/ui/page-objects/home-page'
import {LessonPage as POLessonPage} from './lib/ui/page-objects/lesson-page'
import {BoredAPI} from './lib/rest/boredapi'
import {BoredAPIHelper} from './lib/helpers/boredapi.helper'
import { GlobalBrowser } from './lib/browser'

export const UIGlobalBrowser = Container.get(GlobalBrowser);

export const HomePage = Container.get(POHomePage);
export const LessonPage = Container.get(POLessonPage);

export const Bored = Container.get(BoredAPI);
export const BoredHelper = Container.get(BoredAPIHelper);

