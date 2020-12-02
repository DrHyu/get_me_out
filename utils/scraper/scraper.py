import re
import json
import requests

from selenium.webdriver.common.keys import Keys
from selenium import webdriver
from bs4 import BeautifulSoup
from time import sleep


def get_source():

    URL = '--URL HERE --'

    # Webdriver must be installed !
    # https://selenium-python.readthedocs.io/installation.html
    browser = webdriver.Chrome()
    browser.get(URL)

    show_more_button = browser.find_elements_by_xpath(
        '/html/body/div[1]/div/section/div[3]/div[2]/div[2]/div[2]/span')[0]

    try:
        # Click the 'show more' button n times to load more roomscape
        # Keep doing it untill the button disappears
        while True:
            show_more_button.click()
            # Send page down to scroll and force the images to begin loading
            for _ in range(3):
                browser.find_element_by_tag_name(
                    'body').send_keys(Keys.PAGE_DOWN)
                sleep(2)
    except:
        pass
    finally:
        with open('scraped_site.html', 'w', encoding='utf-8') as f:
            f.write(browser.page_source)
        browser.close()


def scrape():

    with open('scraped_site.html', 'r', encoding='utf-8') as f:
        data = f.read()

    soup = BeautifulSoup(data, 'lxml')

    data = {}
    base_div = soup.find('div', {'id': 'row-view'})
    childs = base_div.find_all('div', recursive=False)

    for idx, div in enumerate(childs[:]):
        if 'id' in div.attrs and re.match('room-\d+', div['id']):
            id = re.findall('room-(\d+)', div['id'])[0]

            temp = {}

            try:
                selector = '#room-{} > div > div > div.col-12.col-lg > div.row.room-title-wrapper > div > h5 > a'.format(
                    id)
                temp['name'] = div.select(selector)[0]['title']
            except:
                pass

            try:
                selector = '#room-{} > div > div > div.col-12.col-lg > div.row.room-title-wrapper > div > div.d-inline-block.cvv-ranking > ul > li > span'.format(
                    id)
                temp['overall_rating'] = div.select(
                    selector)[0].contents[2].strip()
            except:
                pass

            try:
                selector = '#room-{} > div > div > div.col-12.col-lg > div.row.room-title-wrapper > div > div.d-inline-block.cvv-ranking > ul > li:nth-child(2) > span'.format(
                    id)
                temp['terror_rating'] = div.select(
                    selector)[0].contents[2].strip()
            except:
                pass

            try:
                selector = '#room-{} > div > div > div.col-12.col-lg > div.row.room-title-wrapper > div > div:nth-child(3) > strong'.format(
                    id)
                temp['company'] = div.select(selector)[0].contents[0]
            except:
                pass

            try:
                selector = '#room-{} > div > div > div.col-12.col-lg > div.row.room-title-wrapper > div > div:nth-child(3) > a'.format(
                    id)
                temp['location'] = div.select(selector)[0].contents[0]
            except:
                pass

            try:
                selector = '#room-{} > div > div > div.col-12.col-lg-auto > div'.format(
                    id)
                url = re.findall(
                    'url\("(.*)"\)', div.select(selector)[0]['style'])[0]

                if url:
                    response = requests.get(url)
                    with open('scrapped_imgs/room_{}.jpg'.format(id), 'wb') as f:
                        f.write(response.content)

                    temp['source_img'] = url
                    temp['img'] = 'scrapped_imgs/room_{}.jpg'.format(id)

            except:
                pass

            print('{}/{}'.format(idx, len(childs)))
            data[id] = temp

    with open('scrapped_data.json', 'w', encoding='utf-8') as f:
        f.write(json.dumps(data, indent=2, ensure_ascii=False))


if __name__ == "__main__":
    get_source()
    scrape()
