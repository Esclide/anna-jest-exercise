import {HomePage as POHomePage} from './lib/ui/page-objects/home-page'
import {LessonPage as POLessonPage} from './lib/ui/page-objects/lesson-page'
import {BoredAPI} from './lib/rest/boredapi'
import {BoredAPIHelper} from './lib/helpers/boredapi.helper'
import { GlobalBrowser } from './lib/browser'

export const UIGlobalBrowser = new GlobalBrowser();

export const HomePage = new POHomePage();
export const LessonPage = new POLessonPage();

export const Bored = new BoredAPI();
export const BoredHelper = new BoredAPIHelper();

