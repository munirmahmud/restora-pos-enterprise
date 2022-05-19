import * as remoteMain from '@electron/remote/main';
import { app, BrowserWindow, ipcMain, shell } from 'electron';
import log from 'electron-log';
import { autoUpdater } from 'electron-updater';
import moment from 'moment';
import path from 'path';
import 'regenerator-runtime/runtime';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';
const sqlite3 = require('sqlite3').verbose();
const { mkdirSync, copyFileSync, existsSync } = require('fs');
remoteMain.initialize();

/********************* TYPES ***********************/
type ErrorType = {
  message: string;
};

declare global {
  interface Window {
    get_employee_designation: any;
    insert_employee_designation: any;
    delete_employee_designation: any;
    insert_department: any;
    fetch_department: any;
    delete_department: any;
    insert_sub_department: any;
    fetch_sub_department: any;
    delete_sub_department: any;
    insert_salary_advance: any;
    fetch_salary_advance: any;
    delete_salary_advance: any;
    insert_employee: any;
    insert_floor: any;
    delete_floor: any;
    fetch_floor: any;
    insert_customer_table: any;
    fetch_customer_table: any;
    delete_customer_table: any;
    fetch_table_based_on_floor_id: any;
    fetch_table_based_on_floor_id_response: any;
    send_status_to_create_table: any;
    get_table_data: any;
  }
}

// Initialize db path
var dbPath = app.getPath('userData');

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null | null = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDevelopment =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDevelopment) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch((err: ErrorType) => console.log(err));
};

const createWindow = async () => {
  if (isDevelopment) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: any) => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    minWidth: 1024,
    minHeight: 600,
    icon: getAssetPath('favicon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      webSecurity: false,
      nativeWindowOpen: true,
      nodeIntegration: true,
      // enableRemoteModule: true,
    },
  });
  remoteMain.enable(mainWindow.webContents);

  mainWindow.maximize();

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.on('new-window', (event, url) => {
    event.preventDefault();
    shell.openExternal(url);
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

// Get parent category data
ipcMain.on('parent_category', (_event, args) => {
  if (args.status) {
    let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);
    db.serialize(() => {
      let sql = `SELECT category_id, category_name, parent_id, category_is_active FROM add_item_category ORDER BY category_id DESC`;
      db.all(sql, [], (_err: ErrorType, rows: any) => {
        mainWindow.webContents.send('parent_category', rows);
      });
    });

    db.close();
  }
});

/*======================================================
  SETTINGS
========================================================*/
// Insert & Update Settings
ipcMain.on('insert_settings', (_event, args) => {
  let appFavicon: any = null,
    appLogo: any = null;

  if (args.newFavicon) {
    appFavicon = JSON.parse(args.favicon);
  } else {
    appFavicon = args.favicon;
  }

  if (args.newLogo) {
    appLogo = JSON.parse(args.logo);
  } else {
    appLogo = args.logo;
  }

  // Set setting images and icons path
  let settings_favicon_folder_name = 'settings_favicon';
  let settings_logo_folder_name = 'settings_logo';
  setImagePath(
    settings_favicon_folder_name, // Setting images folder name
    settings_logo_folder_name, // Setting icons folder name
    appFavicon?.path, // Setting image path
    appFavicon?.name, // Setting image name
    appLogo?.path, // Setting icon path
    appLogo?.name // Setting icon namesettings_logo
  );

  let {
    title,
    storename,
    address,
    email,
    phone,
    opentime,
    closetime,
    vat,
    vattinno,
    discount_type,
    discountrate,
    servicecharge,
    service_chargeType,
    currency,
    min_prepare_time,
    language,
    timezone,
    dateformat,
    site_align,
    powerbytxt,
    footer_text,
  } = args;

  // Create DB connection
  let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);

  db.serialize(() => {
    db.run(`DROP TABLE IF EXISTS setting`)
      .run(
        `CREATE TABLE IF NOT EXISTS setting (
          "id" INTEGER PRIMARY KEY AUTOINCREMENT,
          "title" varchar(255),
          "storename" varchar(100),
          "address" TEXT,
          "email" varchar(255),
          "phone" varchar(25),
          "favicon" varchar(100),
          "logo" varchar(255),
          "opentime" varchar(255),
          "closetime" varchar(255),
          "vat" REAL,
          "vattinno" varchar(30),
          "discount_type" INT,
          "discountrate" REAL,
          "servicecharge" REAL,
          "service_chargeType" INT,
          "currency" INT,
          "min_prepare_time" varchar(50),
          "language" varchar(100),
          "timezone" varchar(150),
          "dateformat" TEXT,
          "site_align" varchar(50),
          "powerbytxt" TEXT,
          "footer_text" varchar(255)
        )`
      )
      .run(
        `INSERT INTO setting
          ( title, storename, address, email, phone, favicon, logo, opentime, closetime, vat, vattinno, discount_type, discountrate, servicecharge, service_chargeType,
            currency, min_prepare_time, language, timezone, dateformat, site_align, powerbytxt, footer_text )
          VALUES( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )`,
        [
          title,
          storename,
          address,
          email,
          phone,
          appFavicon?.name
            ? path?.join(
                app.getPath('userData'),
                'assets',
                settings_favicon_folder_name,
                appFavicon.name
              )
            : appFavicon,
          appLogo?.name
            ? path?.join(
                app.getPath('userData'),
                'assets',
                settings_logo_folder_name,
                appLogo.name
              )
            : appLogo,
          opentime,
          closetime,
          vat,
          vattinno,
          discount_type,
          discountrate,
          servicecharge,
          service_chargeType,
          currency,
          min_prepare_time,
          language,
          timezone,
          dateformat,
          site_align,
          powerbytxt,
          footer_text,
        ],
        (err: ErrorType) => {
          err
            ? mainWindow.webContents.send(
                'insert_settings_response',
                err.message
              )
            : mainWindow.webContents.send('insert_settings_response', {
                status: 'inserted',
              });
        }
      );
  });

  db.close();
});

// Get Settings for the application settings fields to display them in the fields
getListItems(
  'get_app_settings', //Channel Name
  'get_app_settings_response', //Channel response
  'setting' //Table Name
);

// Get Settings for the whole application
ipcMain.on('get_settings', (_event: Electron.IpcMainEvent, args) => {
  let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);
  let { status } = args;
  let sql = `SELECT setting.*, currency.currency_icon, currency.position
  FROM setting INNER JOIN currency ON setting.currency=currency.id`;

  if (status) {
    db.serialize(() => {
      db.all(sql, [], (_err: ErrorType, rows: any) => {
        if (rows) {
          const settingsData = {
            ...rows[0],
            isAppSetupDone: true,
          };

          mainWindow.webContents.send('get_settings_response', settingsData);
        } else {
          mainWindow.webContents.send('get_settings_response', {
            isAppSetupDone: false,
          });
        }
      });
    });
  }

  db.close();
});

// getListItems(
//   'get_settings', //Channel Name
//   'get_settings_response', //Channel response
//   'setting', //Table Name
//   'title, storename, address, logo, opentime, closetime, vat, vattinno, discount_type, discountrate, servicecharge, service_chargeType, currency, site_align, dateformat, timezone' //Columns
// );

/**
 * Set images paths
 * @params string images folder name
 * @params string icons folder name
 * @params string image path
 * @params string image name
 * @params string icon path
 * @params string icon name
 *
 */

function setImagePath(
  images_folder_name: string,
  icons_folder_name: string,
  image_path: string,
  image_name: string,
  icon_path: string,
  icon_name: string
) {
  try {
    mkdirSync(path.join(app.getPath('userData'), 'assets'));
    if (image_path) {
      let folderToCreate = path.join(
        app.getPath('userData'),
        'assets',
        images_folder_name
      );

      if (existsSync(folderToCreate)) {
        let fileToCopy = image_path;
        let newFileName = image_name;
        let dest = path.join(folderToCreate, newFileName);
        copyFileSync(fileToCopy, dest);
      } else {
        let fileToCopy = image_path;
        let newFileName = image_name;
        let dest = path.join(folderToCreate, newFileName);
        mkdirSync(folderToCreate);
        copyFileSync(fileToCopy, dest);
      }
    }
    if (icon_path) {
      let folderToCreate = path.join(
        app.getPath('userData'),
        'assets',
        icons_folder_name
      );

      if (existsSync(folderToCreate)) {
        let fileToCopy = icon_path;
        let newFileName = icon_name;
        let dest = path.join(folderToCreate, newFileName);
        copyFileSync(fileToCopy, dest);
      } else {
        let fileToCopy = icon_path;
        let newFileName = icon_name;
        let dest = path.join(folderToCreate, newFileName);
        mkdirSync(folderToCreate);
        copyFileSync(fileToCopy, dest);
      }
    }
  } catch (error) {
    if (image_path) {
      let folderToCreate = path.join(
        app.getPath('userData'),
        'assets',
        images_folder_name
      );

      if (existsSync(folderToCreate)) {
        let fileToCopy = image_path;
        let newFileName = image_name;
        let dest = path.join(folderToCreate, newFileName);
        copyFileSync(fileToCopy, dest);
      } else {
        let fileToCopy = image_path;
        let newFileName = image_name;
        let dest = path.join(folderToCreate, newFileName);
        mkdirSync(folderToCreate);
        copyFileSync(fileToCopy, dest);
      }
    }
    if (icon_path) {
      let folderToCreate = path.join(
        app.getPath('userData'),
        'assets',
        icons_folder_name
      );

      if (existsSync(folderToCreate)) {
        let fileToCopy = icon_path;
        let newFileName = icon_name;
        let dest = path.join(folderToCreate, newFileName);
        copyFileSync(fileToCopy, dest);
      } else {
        let fileToCopy = icon_path;
        let newFileName = icon_name;
        let dest = path.join(folderToCreate, newFileName);
        mkdirSync(folderToCreate);
        copyFileSync(fileToCopy, dest);
      }
    }
  }
}

// Insert and Update Category data
ipcMain.on('insertCategoryData', (_event, args) => {
  let cat_img: any = null,
    cat_icon: any = null;

  if (args.new_category_image) {
    cat_img = JSON.parse(args.category_image);
  } else {
    cat_img = args.category_image;
  }

  if (args.new_category_icon) {
    cat_icon = JSON.parse(args.category_icon);
  } else {
    cat_icon = args.category_icon;
  }

  // Set categories images and icons path
  let cat_image_folder_name = 'categories_images';
  let cat_icon_folder_name = 'categories_icons';
  setImagePath(
    cat_image_folder_name, // Category images folder name
    cat_icon_folder_name, // Category icons folder name
    cat_img?.path, // Category image path
    cat_img?.name, // Category image name
    cat_icon?.path, // Category icon path
    cat_icon?.name // Category icon name
  );

  let {
    category_name,
    parent_id,
    category_is_active,
    offer_start_date,
    offer_end_date,
    category_color,
  } = args;

  let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);

  if (args.category_id !== undefined) {
    db.serialize(() => {
      db.run(
        `INSERT OR REPLACE INTO add_item_category ( category_id, category_name, parent_id, category_image, category_icon, category_is_active, offer_start_date, offer_end_date, category_color )
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          args.category_id,
          category_name,
          parent_id,
          cat_img?.name
            ? path.join(
                app.getPath('userData'),
                'assets',
                cat_image_folder_name,
                cat_img.name
              )
            : cat_img,

          cat_icon?.name
            ? path.join(
                app.getPath('userData'),
                'assets',
                cat_icon_folder_name,
                cat_icon.name
              )
            : cat_icon,

          category_is_active,
          offer_start_date,
          offer_end_date,
          category_color,
        ],
        (err: ErrorType) => {
          err
            ? mainWindow.webContents.send(
                'after_insert_get_response',
                err.message
              )
            : mainWindow.webContents.send('after_insert_get_response', {
                status: 'updated',
              });
        }
      );
    });
  } else {
    db.serialize(() => {
      db.run(
        `CREATE TABLE IF NOT EXISTS add_item_category (
          'category_id' INTEGER PRIMARY KEY AUTOINCREMENT,
          'category_name' varchar(255),
          'category_image' varchar(255),
          'position' INT,
          'category_is_active' INT,
          'offer_start_date' DATE ,
          'offer_end_date' DATE,
          'isoffer' INT,
          'category_color' varchar(50),
          'category_icon' varchar(255),
          'parent_id' INT,
          'user_id_inserted' INT,
          'user_id_updated' INT,
          'user_id_locked' INT,
          'date_inserted' DATETIME,
          'date_updated' DATETIME,
          'date_locked' DATETIME
        )`
      ).run(
        `INSERT OR REPLACE INTO add_item_category ( category_name, parent_id, category_image, category_icon, category_is_active, offer_start_date, offer_end_date, category_color )
         VALUES (?, ?, ?, ?, ?, ?, ?, ? )`,
        [
          category_name,
          parent_id,
          cat_img?.name
            ? path.join(
                app.getPath('userData'),
                'assets',
                cat_image_folder_name,
                cat_img.name
              )
            : cat_img?.name,

          cat_icon?.name
            ? path.join(
                app.getPath('userData'),
                'assets',
                cat_icon_folder_name,
                cat_icon.name
              )
            : cat_icon?.name,
          category_is_active,
          offer_start_date,
          offer_end_date,
          category_color,
        ],
        (err: ErrorType) => {
          err
            ? mainWindow.webContents.send(
                'after_insert_get_response',
                err.message
              )
            : mainWindow.webContents.send('after_insert_get_response', {
                status: 'inserted',
              });
        }
      );
    });
  }

  db.close();
});

// Get all category list
ipcMain.on('sendResponseForCategory', (_event: Electron.IpcMainEvent, args) => {
  let { status } = args;

  if (status) {
    let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);
    let db2 = new sqlite3.Database(`${dbPath}/restora-pos.db`);

    let sqlQ = `SELECT * FROM add_item_category WHERE parent_id IS NULL`;
    let sqlQ2 = `SELECT * FROM add_item_category WHERE parent_id IS NOT NULL`;

    db.serialize(() => {
      db.all(sqlQ, [], (_err: ErrorType, categories: any) => {
        db2.all(sqlQ2, [], (_err: ErrorType, sub_categories: any) => {
          sub_categories?.map((s: any) => {
            categories?.map((c: any) => {
              if (c.category_id === s.parent_id) {
                let sub_cat = {
                  category_id: s.category_id,
                  category_name: s.category_name,
                  category_image: s.category_image,
                  category_is_active: s.category_is_active,
                  category_color: s.category_color,
                  parent_id: s.parent_id,
                  category_icon: s.category_icon,
                  parent_cat: c.category_name,
                };

                if (Array.isArray(c.subCategories)) {
                  c.subCategories.push(sub_cat);
                } else {
                  c.subCategories = [{ ...sub_cat }];
                }
              }
            });
          });
        });

        db2.close();
        setTimeout(() => {
          mainWindow.webContents.send('sendCategoryData', categories);
        }, 1000);
      });
    });

    db.close();
  }
});

// Delete category data
ipcMain.on('delete_category', (_event, args) => {
  let { id } = args;
  let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);
  db.serialize(() => {
    db.run(
      `DELETE FROM add_item_category WHERE category_id = ?`,
      id,
      (err: ErrorType) => {
        err
          ? mainWindow.webContents.send('delete_category_response', {
              status: err,
            })
          : mainWindow.webContents.send('delete_category_response', {
              status: true,
            });
      }
    );
  });

  db.close();
});

// Insert and update addons data
ipcMain.on('add_addons', (_event, args) => {
  let { add_on_name, price, is_active } = args;

  if (args.add_on_id !== undefined) {
    let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);
    db.serialize(() => {
      db.run(
        `INSERT OR REPLACE INTO addons ( add_on_id, add_on_name, price, is_active, date_inserted ) VALUES ( ?, ?, ?, ?, ?)`,
        [args.add_on_id, add_on_name, price, is_active, Date.now()],
        (err: ErrorType) => {
          err
            ? mainWindow.webContents.send('add_addons_response', err.message)
            : mainWindow.webContents.send('add_addons_response', {
                status: 'updated',
              });
        }
      );
    });
    db.close();
  } else {
    let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);
    db.serialize(() => {
      db.run(
        `CREATE TABLE IF NOT EXISTS addons (
        "add_on_id" INTEGER PRIMARY KEY AUTOINCREMENT,
        "add_on_name" varchar(255),
        "price" REAL,
        "is_active" INT,
        "tax0" TEXT,
        "tax1" TEXT,
        "date_inserted" DATETIME
            )`
      ).run(
        `INSERT OR REPLACE INTO addons ( add_on_name, price, is_active, date_inserted ) VALUES ( ?, ?, ?, ?)`,
        [add_on_name, price, is_active, Date.now()],
        (err: ErrorType) => {
          err
            ? mainWindow.webContents.send('add_addons_response', err.message)
            : mainWindow.webContents.send('add_addons_response', {
                status: 'inserted',
              });
        }
      );
    });
    db.close();
  }
});

// Get all addons from DB
getListItems('addons_list', 'addons_list_response', 'addons');

// Delete addons data
deleteListItem(
  'delete_addons', //channel name
  'delete_addons_response', //response event,
  'addons' //table name
);

ipcMain.on('delete_addons', (_event, args) => {
  let { id } = args;
  let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);
  db.serialize(() => {
    db.run(`DELETE FROM addons WHERE add_on_id = ?`, id, (err: ErrorType) => {
      err
        ? mainWindow.webContents.send('delete_addons_response', { status: err })
        : mainWindow.webContents.send('delete_addons_response', {
            status: true,
          });
    });
  });
  db.close();
});

/*==================================================================
Insert and update foods to DB
==================================================================*/
ipcMain.on('add_new_foods', (_event, args) => {
  let product_img: any;

  try {
    if (args?.food_image) {
      product_img = JSON.parse(args.food_image);
    }
  } catch (error) {
    product_img = args.food_image;
  }

  // Set food images and icons path
  let foods_images_folder_name = 'foods_images';
  setImagePath(
    foods_images_folder_name, // Food images folder name
    '', // Food icons folder name
    product_img?.path, // Food image path
    product_img?.name, // Food image name
    '', // Food icon path
    '' // Food icon name
  );

  let {
    category_name,
    kitchen_select,
    food_name,
    component,
    notes,
    description,
    vat,
    offer_is_available,
    special,
    custom_quantity,
    cooking_time,
    menu_type,
    food_status,
    offer_rate,
    offer_start_date,
    offer_end_date,
    date_inserted,
  } = args;

  if (args.id !== undefined) {
    let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);
    db.serialize(() => {
      db.run(
        `INSERT OR REPLACE INTO item_foods (id, category_id, product_name, product_image, component, description, item_note, menu_type, product_vat, special, offers_rate, offer_is_available, offer_start_date, offer_end_date, kitchen_id, is_custom_quantity, cooked_time, is_active, date_inserted)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          args.id,
          category_name,
          food_name,
          product_img?.name
            ? path.join(
                app.getPath('userData'),
                'assets',
                foods_images_folder_name,
                product_img.name
              )
            : product_img,
          component,
          description,
          notes,
          menu_type,
          vat,
          special,
          offer_rate,
          offer_is_available,
          offer_start_date,
          offer_end_date,
          kitchen_select,
          custom_quantity,
          cooking_time,
          food_status,
          date_inserted,
        ],
        (err: ErrorType) => {
          err
            ? mainWindow.webContents.send('add_new_foods_response', err.message)
            : mainWindow.webContents.send('add_new_foods_response', {
                status: 'updated',
              });
        }
      );
    });
    db.close();
  } else {
    let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);
    db.serialize(() => {
      db.run(
        `CREATE TABLE IF NOT EXISTS item_foods (
          'id' INTEGER PRIMARY KEY AUTOINCREMENT,
          'category_id' INT NOT NULL,
          'product_name' varchar(255),
          'product_image' varchar(200),
          'big_thumb' varchar(255),
          'medium_thumb' varchar(255),
          'small_thumb' varchar(255),
          'component' TEXT,
          'description' TEXT,
          'item_note' varchar(255),
          'menu_type' varchar(25),
          'product_vat' REAL DEFAULT 0.00,
          'special' INT,
          'offers_rate' INT,
          'offer_is_available' INT,
          'offer_start_date' DATETIME ,
          'offer_end_date' DATETIME,
          'position' INT,
          'kitchen_id' INT,
          'is_group' INT,
          'is_custom_quantity' INT,
          'cooked_time' varchar(10),
          'is_active' INT,
          'user_id_inserted' INT,
          'user_id_updated' INT,
          'user_id_locked' INT,
          'date_inserted' DATETIME,
          'date_updated' DATETIME,
          'date_locked' DATETIME,
          'tax0' TEXT,
          'tax1' TEXT
        )`
      ).run(
        `INSERT OR REPLACE INTO item_foods (category_id, product_name, product_image, component, description, item_note, menu_type, product_vat, special, offers_rate, offer_is_available,
          offer_start_date, offer_end_date, kitchen_id, is_custom_quantity, cooked_time, is_active, date_inserted)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          category_name,
          food_name,
          product_img?.name
            ? path.join(
                app.getPath('userData'),
                'assets',
                foods_images_folder_name,
                product_img.name
              )
            : product_img?.name,

          component,
          description,
          notes,
          menu_type,
          vat,
          special,
          offer_rate,
          offer_is_available,
          offer_start_date,
          offer_end_date,
          kitchen_select,
          custom_quantity,
          cooking_time,
          food_status,
          Date.now(),
        ],
        (err: ErrorType) => {
          err
            ? mainWindow.webContents.send('add_new_foods_response', err.message)
            : mainWindow.webContents.send('add_new_foods_response', {
                status: 'inserted',
              });
        }
      );
    });
    db.close();
  }
});

// Get all food list to display in the food list page
ipcMain.on('get_food_list', (_event: Electron.IpcMainEvent, args) => {
  let { status } = args;
  let sql = `SELECT item_foods.id, item_foods.category_id, add_item_category.category_name, item_foods.product_name, item_foods.product_image, item_foods.component, item_foods.description, item_foods.item_note, item_foods.menu_type, item_foods.product_vat, item_foods.special, item_foods.offers_rate, item_foods.offer_is_available, item_foods.offer_start_date, item_foods.offer_end_date, item_foods.kitchen_id, item_foods.is_custom_quantity, item_foods.cooked_time, item_foods.is_active FROM item_foods INNER JOIN add_item_category ON item_foods.category_id=add_item_category.category_id`;

  if (status) {
    let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);
    db.serialize(() => {
      db.all(sql, [], (_err: ErrorType, rows: any) => {
        mainWindow.webContents.send('get_food_list_response', rows);
      });
    });
    db.close();
  }
});

// item_foods.menu_type, item_foods.is_active
// Food list for the POS with (variants & addons)
// SELECT variants.id, variants.food_id, variants.variant_name, variants.price FROM variants
ipcMain.on('get_food_list_pos', (_event: Electron.IpcMainEvent, args) => {
  let { status } = args;
  // let sql = `SELECT item_foods.id, item_foods.category_id, item_foods.product_name, item_foods.product_image, item_foods.item_note, item_foods.product_vat, item_foods.special, item_foods.offers_rate, item_foods.offer_is_available, item_foods.is_custom_quantity,
  // variants.id AS variant_id, variants.food_id, variants.variant_name, variants.price
  // FROM item_foods JOIN variants ON item_foods.id = variants.food_id`;
  let sql = `select DISTINCT item_foods.*
  FROM item_foods
  INNER JOIN variants
  ON variants.food_id = item_foods.id`;

  if (status) {
    let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);
    db.serialize(() => {
      db.all(sql, [], (_err: ErrorType, rows: any) => {
        mainWindow.webContents.send('get_food_list_pos_response', rows);
      });
    });
    db.close();
  }
});

// Invoice id genaretor
const tokenGenaretor = () => {
  return new Promise((resolve, reject) => {
    let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);
    db.serialize(() => {
      db.all(
        'SELECT token_no, creation_date FROM orders ORDER BY order_id DESC LIMIT 1',
        [],
        (err: ErrorType, rows: any) => {
          if (err) reject(err);
          resolve(rows);
        }
      );
    });
    db.close();
  });
};

// Insert order
ipcMain.on('insert_order_info', (_event, args: any) => {
  let {
    cartItems,
    customer_id,
    grandTotal,
    discount,
    serviceCharge,
    waiter_id,
    customer_type_id,
    cooking_time,
    floor_id,
    table_id,
    booked,
    vat,
  } = args;

  // let waiter_id = 1;
  // let customer_type_id = 2;
  // let cooking_time = 2022;

  // let floor_id = [6, 4];
  // let table_id = [1, 2, 3];
  // let booked = [3,5,8];

  tokenGenaretor()
    .then((results: any) => {
      let date = new Date(results[0].creation_date);
      let existingDateFormat = date.toLocaleDateString('en', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      });

      let todaysDateTimeMilisec = Date.now();
      let todaysDate = new Date(todaysDateTimeMilisec);
      let todaysDateFormat = todaysDate.toLocaleDateString('en', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      });

      let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);
      db.serialize(() => {
        db.run(
          `CREATE TABLE IF NOT EXISTS orders(
        "order_id" INTEGER PRIMARY KEY AUTOINCREMENT,
        "order_info" varchar(255),
        "customer_id" INT,
        "creation_date" DATETIME,
        "discount" REAL,
        "serviceCharge" REAL,
        "vat" REAL,
        "grand_total" REAL,
        "token_no" INT,
        "waiter_id" INT,
        "customer_type_id" INT,
        "floor_id" INT,
        "table_id" INT,
        "cooking_time" varchar(50),
        "booked" INT,
        "status" INT NOT NULL DEFAULT 1,
        "creation_date" INT
    )`
        ).run(
          `INSERT INTO orders (order_info, customer_id, discount, serviceCharge, vat, grand_total,
            token_no, waiter_id, customer_type_id, floor_id, table_id, cooking_time, booked, creation_date)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            JSON.stringify(cartItems),
            customer_id,
            discount,
            serviceCharge,
            vat,
            grandTotal,
            results[0]
              ? todaysDateFormat === existingDateFormat
                ? results[0].token_no + 1
                : 1
              : 1,
            waiter_id ? waiter_id : 'Munir',
            customer_type_id,
            JSON.stringify(floor_id),
            JSON.stringify(table_id),
            cooking_time,
            JSON.stringify(booked),
            Date.now(),
          ]
        );
      });
      db.close();
    })
    .catch((err) => {
      let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);
      db.serialize(() => {
        db.run(
          `CREATE TABLE IF NOT EXISTS orders(
        "order_id" INTEGER PRIMARY KEY AUTOINCREMENT,
        "order_info" varchar(255),
        "customer_id" INT,
        "discount" REAL,
        "serviceCharge" REAL,
        "vat" REAL,
        "grand_total" REAL,
        "token_no" INT,
        "waiter_id" INT,
        "customer_type_id" INT,
        "floor_id" INT,
        "table_id" INT,
        "cooking_time" varchar(50),
        "booked" INT,
        "status" INT NOT NULL DEFAULT 1,
        "creation_date" INT
    )`
        ).run(
          `INSERT INTO orders (order_info, customer_id, discount, serviceCharge, vat, grand_total,
            token_no, waiter_id, customer_type_id, floor_id, table_id, cooking_time, booked, creation_date)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            JSON.stringify(cartItems),
            customer_id,
            discount,
            serviceCharge,
            vat,
            grandTotal,
            1,
            waiter_id,
            customer_type_id,
            JSON.stringify(floor_id),
            JSON.stringify(table_id),
            cooking_time,
            JSON.stringify(booked),
            Date.now(),
          ]
        );
      });
      db.close();
    });
});

// get table data for orders
ipcMain.on('get_table_data', (_event, args) => {
  if (args.status) {
    let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);
    db.serialize(() => {
      db.all(
        `SELECT orders.order_id, orders.creation_date, orders.floor_id, orders.table_id, orders.booked FROM orders`,
        [],
        (_err: ErrorType, rows: any) => {
          mainWindow.webContents.send('get_table_data_response', rows);
        }
      );
    });
    db.close();
  }
});

// Update order info after edit
ipcMain.on('update_order_info_after_edit', (_event, args) => {
  let { order_info, order_id, discount, serviceCharge, vat, grand_total } =
    args;
  let order_info_to_string = JSON.stringify(order_info);

  let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);
  db.serialize(() => {
    db.run(
      `UPDATE orders
       SET order_info = ?, discount = ?, serviceCharge = ?, vat = ?, grand_total = ?, creation_date = ?
       WHERE order_id = ?`,
      [
        order_info_to_string,
        discount,
        serviceCharge,
        vat,
        grand_total,
        Date.now(),
        order_id,
      ]
    );
  });
  db.close();
});

// SELECT orders.*, (employees.first_name ||' ' || employees.last_name)AS waiter_name, customer_type.customertype AS customer_type
// FROM orders
// INNER JOIN employees
// ON orders.waiter_id = employees.id
// INNER JOIN customer_type
// ON orders.customer_type_id = customer_type.id
// WHERE orders.status = 1

// Get all order info
ipcMain.on('get_all_order_info_ongoing', (_event, args) => {
  let { status } = args;

  if (status) {
    let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);
    let sql = `SELECT orders.*, (employees.first_name ||' ' || CASE WHEN employees.last_name IS NOT NULL
    THEN employees.last_name ELSE '' END) AS waiter_name, customer_type.customertype AS customer_type
    FROM orders
    INNER JOIN employees
    ON orders.waiter_id = employees.id
    INNER JOIN customer_type
    ON orders.customer_type_id = customer_type.id
    WHERE orders.status = 1`;

    db.serialize(() => {
      db.all(sql, [], (_err: ErrorType, rows: any) => {
        mainWindow.webContents.send(
          'get_all_order_info_ongoing_response',
          rows
        );
      });
    });
    db.close();
  }
});

// Get only today's completed order
ipcMain.on('get_todays_completed_orders', (_event, args) => {
  let { status } = args;

  if (status) {
    // Get current datetime
    let datetime = Date.now();
    let date = new Date(datetime);

    // Get current date from datetime
    let result = date.toLocaleDateString('en', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });

    // Convert current date to milliseconds
    let d = new Date(result);
    let milliseconds = d.getTime();

    let sql = `SELECT * FROM orders where status = 2 AND creation_date > ?`;
    let creation_date = milliseconds.toString();
    let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);

    db.serialize(() => {
      db.all(sql, [creation_date], (_err: ErrorType, rows: any) => {
        if (rows && rows.length > 0) {
          const todaysOrders = rows.map((order: any) => {
            return {
              creation_date: moment(order.creation_date).format('ll'),
              order_id: order.order_id,
              customer_id: order.customer_id,
              grand_total: order.grand_total,
              invoice_id: order.order_id,
              status: order.status,
            };
          });
          mainWindow.webContents.send(
            'get_todays_completed_orders_response',
            todaysOrders
          );
        }
      });
    });
    db.close();
  }
});

// Complete order info
ipcMain.on('update_order_info_ongoing', (_event: any, args: any) => {
  let { order_id, grand_total, discount } = args;

  let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);
  // grand_total
  // discount
  db.serialize(() => {
    db.run(
      `UPDATE orders
        SET status = 2, grand_total = ${grand_total}, discount = ${discount}
        WHERE order_id = ${order_id}`
    );
  });
  db.close();
});

// Get sales report
ipcMain.on('get_all_order_for_sales_report', (_event, args) => {
  if (args.status) {
    let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);
    let sql = `SELECT orders.*, customer_info.customer_name
    FROM orders
    INNER JOIN customer_info ON orders.customer_id = customer_info.id
    ORDER BY creation_date DESC`;
    db.all(sql, [], (_err: ErrorType, rows: any) => {
      if (rows && rows.length > 0) {
        const allOrders = rows.map((order: any, index: number) => {
          let temp = JSON.parse(order.order_info);
          let amount = 0;
          temp.map((t: any) => {
            return (amount = t.total_price + amount);
          });
          return {
            key: index,
            saleDate: moment(order.creation_date).format('ll'),
            invoiceNo: order.order_id,
            customerName:
              order.customer_id == 1 ? 'Walk In' : order.customer_name,
            paymentMethod: 'Cash Payment',
            totalAmount: amount,
            vatOrTax: order.vat,
            serviceCharge: order.serviceCharge,
            discount: order.discount,
            grandTotal: order.grand_total,
          };
        });
        mainWindow.webContents.send(
          'get_all_order_for_sales_report_response',
          allOrders
        );
      }
    });
    db.close();
  }
});

// Get item sales report
ipcMain.on(
  'get_order_info_for_item_sales_report',
  (_event: Electron.IpcMainEvent, args) => {
    if (args.status) {
      let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);
      let sql = `SELECT orders.order_info FROM orders`;
      db.all(sql, [], (_err: ErrorType, rows: any) => {
        if (rows && rows.length) {
          let newData = new Array();

          rows.forEach((data: any) => {
            let temp = JSON.parse(data.order_info);
            temp.map((t: any) => newData.push(t));
          });

          const unique = newData;

          const group: any = {};

          unique.forEach((e) => {
            const o = (group[e.id] = group[e.id] || { ...e, quantity: 0 });
            o.quantity += e.quantity;
          });

          const res = Object.values(group);

          mainWindow.webContents.send(
            'get_order_info_for_item_sales_report_response',
            res
          );
        }
      });

      db.close();
    }
  }
);

// Get dashboard report
ipcMain.on('get_dashboard_data', (_event, args) => {
  if (args.status) {
    let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);
    let sql = `SELECT creation_date FROM orders`;
    let sql2 = `SELECT creation_date FROM orders WHERE status = 2`;
    let lifeTimeOrderQ = `SELECT COUNT(*) FROM orders`;
    let totalCustomerQ = `SELECT COUNT(*) FROM customer_info`;
    // let totalSalesQ = `SELECT COUNT(*) FROM orders where status = 2`;
    let todaysSalesQ = `SELECT COUNT(*) FROM orders where status = 2 and creation_date > ?`;
    let todaysOrderQ = `SELECT COUNT(*) FROM orders where creation_date > ?`;

    let promise1 = new Promise((resolve, _reject) => {
      db.all(sql, [], (_err: ErrorType, rows: any) => {
        if (rows && rows.length > 0) {
          let orderCount = rows.map((row: any) =>
            moment(row.creation_date).format('MMMM')
          );
          const ordersCounts = {
            January: 0,
            February: 0,
            March: 0,
            April: 0,
            May: 0,
            June: 0,
            July: 0,
            August: 0,
            September: 0,
            October: 0,
            November: 0,
            December: 0,
          };
          orderCount?.forEach((x: any) => {
            ordersCounts[x] = (ordersCounts[x] || 0) + 1;
          });
          resolve(ordersCounts);
        }
      });
    });
    let promise2 = new Promise((resolve, _reject) => {
      db.all(sql2, [], (_err: ErrorType, rows: any) => {
        if (rows && rows.length > 0) {
          let salesCount = rows.map((row: any) =>
            moment(row.creation_date).format('MMMM')
          );
          const salesCounts = {
            January: 0,
            February: 0,
            March: 0,
            April: 0,
            May: 0,
            June: 0,
            July: 0,
            August: 0,
            September: 0,
            October: 0,
            November: 0,
            December: 0,
          };
          salesCount?.forEach((x: any) => {
            salesCounts[x] = (salesCounts[x] || 0) + 1;
          });
          resolve(salesCounts);
        }
      });
    });

    let promise3 = new Promise((resolve, _reject) => {
      db.all(lifeTimeOrderQ, [], (_err: ErrorType, rows: any) => {
        if (rows && rows.length > 0) {
          resolve(rows[0]['COUNT(*)']);
        }
      });
    });

    let promise4 = new Promise((resolve, _reject) => {
      // Get current datetime
      let datetime = Date.now();
      let date = new Date(datetime);

      // Get current date from datetime
      let result = date.toLocaleDateString('en', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      });

      // Convert current date to milliseconds
      let d = new Date(result);
      let milliseconds = d.getTime();

      let creation_date = milliseconds.toString();
      let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);
      db.all(todaysSalesQ, [creation_date], (_err: ErrorType, rows: any) => {
        if (rows && rows.length > 0) {
          resolve(rows[0]['COUNT(*)']);
        }
      });
      db.close();
    });

    let promise5 = new Promise((resolve, _reject) => {
      db.all(totalCustomerQ, [], (_err: ErrorType, rows: any) => {
        if (rows && rows.length > 0) {
          resolve(rows[0]['COUNT(*)']);
        }
      });
    });

    let promise6 = new Promise((resolve, _reject) => {
      // Get current datetime
      let datetime = Date.now();
      let date = new Date(datetime);

      // Get current date from datetime
      let result = date.toLocaleDateString('en', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      });

      // Convert current date to milliseconds
      let d = new Date(result);
      let milliseconds = d.getTime();

      let creation_date = milliseconds.toString();
      let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);

      db.all(todaysOrderQ, [creation_date], (_err: ErrorType, rows: any) => {
        if (rows && rows.length > 0) {
          resolve(rows[0]['COUNT(*)']);
        }
      });
      db.close();
    });

    Promise.all([
      promise1,
      promise2,
      promise3,
      promise4,
      promise5,
      promise6,
    ]).then(
      (values) => {
        mainWindow.webContents.send('get_dashboard_data_response', values);
      },
      (reason) => {
        mainWindow.webContents.send('get_dashboard_data_response', reason);
      }
    );
  }
});

// Delete food
deleteListItem(
  'delete_foods', // channel name
  'delete_foods_response', // response event,
  'item_foods' // table name
);

// Get only food lists as an Array for (Food Availability)
getListItems(
  'food_lists_channel',
  'food_lists_response',
  'item_foods',
  'id, product_name',
  true
);

/*==================================================================
  MENU TYPE - in the add food item
==================================================================*/
getListItems(
  'get_menu_type_list',
  'get_menu_type_list_response',
  'menu_type',
  'id, menu_type',
  true
);

/*==================================================================
  FOOD VARIANT
==================================================================*/
// Insert and update foods variant
ipcMain.on('add_new_foods_variant', (_event, args) => {
  let { food_id, food_variant, food_price, date_inserted } = args;

  if (args.id !== undefined) {
    let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);

    db.serialize(() => {
      db.run(
        `INSERT OR REPLACE INTO variants (id, food_id, variant_name, price, date_inserted)
        VALUES (?, ?, ?, ?, ?)`,
        [args.id, food_id, food_variant, Number(food_price), date_inserted],
        (err: ErrorType) => {
          err
            ? mainWindow.webContents.send(
                'add_new_foods_variant_response',
                err.message
              )
            : mainWindow.webContents.send('add_new_foods_variant_response', {
                status: 'updated',
              });
        }
      );
    });
    db.close();
  } else {
    let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);
    db.serialize(() => {
      db.run(
        `CREATE TABLE IF NOT EXISTS variants (
          'id' INTEGER PRIMARY KEY AUTOINCREMENT,
          'food_id' INT,
          'variant_name' varchar(255),
          'price' REAL,
          'date_inserted' DATETIME
        )`
      ).run(
        `INSERT OR REPLACE INTO variants (food_id, variant_name, price, date_inserted)
          VALUES (?, ?, ?, ?)`,
        [food_id, food_variant, Number(food_price), Date.now()],
        (err: ErrorType) => {
          err
            ? mainWindow.webContents.send(
                'add_new_foods_variant_response',
                err.message
              )
            : mainWindow.webContents.send('add_new_foods_variant_response', {
                status: 'inserted',
              });
        }
      );
    });
    db.close();
  }
});

// get all variant list from DB
ipcMain.on('variant_lists_channel', (_event, args) => {
  if (args.status) {
    let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);
    let sql = `SELECT variants.id, variants.variant_name, variants.price, variants.food_id, variants.date_inserted, item_foods.product_name
    FROM variants
    INNER JOIN item_foods ON variants.food_id=item_foods.id`;
    db.serialize(() => {
      db.all(sql, [], (_err: ErrorType, rows: any) => {
        mainWindow.webContents.send('variant_lists_response', rows);
      });
    });
    db.close();
  }
});

// Delete variant from DB
deleteListItem(
  'delete_foods_variant', //channel name
  'delete_foods_variant_response', //response event,
  'variants' //table name
);

/*==================================================================
  FOOD AVAILABILITY
==================================================================*/
// Insert Food availability data
// Insert and update foods variant
ipcMain.on('context_bridge_food_available_time', (_event, args) => {
  let { food_id, avail_day, avail_time, is_active } = args;

  if (args.id !== undefined) {
    let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);

    db.serialize(() => {
      db.run(
        `INSERT OR REPLACE INTO food_variable (id, food_id, avail_day, avail_time, is_active)
        VALUES (?, ?, ?, ?, ?)`,
        [args.id, food_id, avail_day, avail_time, is_active],
        (err: ErrorType) => {
          err
            ? mainWindow.webContents.send(
                'context_bridge_food_available_time_response',
                err.message
              )
            : mainWindow.webContents.send(
                'context_bridge_food_available_time_response',
                {
                  status: 'updated',
                }
              );
        }
      );
    });
    db.close();
  } else {
    let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);
    db.serialize(() => {
      db.run(
        `CREATE TABLE IF NOT EXISTS food_variable (
          'id' INTEGER PRIMARY KEY AUTOINCREMENT,
          'food_id' INT,
          'avail_day' varchar(30),
          'avail_time' varchar(50),
          'is_active' INT
        )`
      ).run(
        `INSERT OR REPLACE INTO food_variable (food_id, avail_day, avail_time, is_active)
          VALUES (?, ?, ?, ?)`,
        [food_id, avail_day, avail_time, is_active],
        (err: ErrorType) => {
          err
            ? mainWindow.webContents.send(
                'context_bridge_food_available_time_response',
                err.message
              )
            : mainWindow.webContents.send(
                'context_bridge_food_available_time_response',
                {
                  status: 'inserted',
                }
              );
        }
      );
    });
    db.close();
  }
});

ipcMain.on('get_food_availability_lists_channel', (_event, args) => {
  if (args.status) {
    let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);

    let sql = `SELECT food_variable.*, item_foods.product_name FROM food_variable, item_foods WHERE food_variable.food_id == item_foods.id`;
    db.serialize(() => {
      db.all(sql, [], (_err: ErrorType, rows: any) => {
        mainWindow.webContents.send(
          'get_food_availability_lists_channel_response',
          rows
        );
      });
    });

    db.close();
  }
});

// Delete food available day & time list channel from
deleteListItem(
  'channel_delete_food_available_day_time', //channel name
  'delete_food_available_day_time_response', //response event,
  'food_variable' //table name
);

/*==================================================================
  MENU TYPE
====================================================================*/
// Insert Menu type
ipcMain.on('context_bridge_menu_type', (_event, args) => {
  let { id, menu_type, menu_icon, is_active } = args;

  let menu_type_icon: any;

  try {
    if (menu_icon) {
      menu_type_icon = JSON.parse(menu_icon);
    }
  } catch (error) {
    menu_type_icon = args.menu_icon;
  }

  // Set categories images and icons path
  let menu_icon_folder_name = 'menu_icons';

  setImagePath(
    menu_icon_folder_name, // Menu images folder name
    '', // Menu icons folder name
    menu_type_icon?.path, // Menu image path
    menu_type_icon?.name, // Menu image name
    '', // Menu icon path
    '' // Menu icon name
  );

  // Execute if the event has menu type ID. It is used to update a specific item
  if (args.id !== undefined) {
    let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);

    db.serialize(() => {
      db.run(
        `INSERT OR REPLACE INTO menu_type (id, menu_type, menu_icon, is_active)
        VALUES (?, ?, ?, ?)`,
        [
          id,
          menu_type,
          menu_type_icon?.name
            ? path.join(
                app.getPath('userData'),
                'assets',
                menu_icon_folder_name,
                menu_type_icon.name
              )
            : menu_type_icon,
          is_active,
        ],
        (err: ErrorType) => {
          err
            ? mainWindow.webContents.send(
                'context_bridge_menu_type_response',
                err.message
              )
            : mainWindow.webContents.send('context_bridge_menu_type_response', {
                status: 'updated',
              });
        }
      );
    });
    db.close();
  } else {
    // Execute if it is new and then insert it
    let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);
    db.serialize(() => {
      db.run(
        `CREATE TABLE IF NOT EXISTS menu_type (
          'id' INTEGER PRIMARY KEY AUTOINCREMENT,
          'menu_type' varchar(120),
          'menu_icon' varchar(150),
          'is_active' INT
        )`
      ).run(
        `INSERT OR REPLACE INTO menu_type (menu_type, menu_icon, is_active)
          VALUES (?, ?, ?)`,
        [
          menu_type,
          menu_type_icon?.name
            ? path.join(
                app.getPath('userData'),
                'assets',
                menu_icon_folder_name,
                menu_type_icon.name
              )
            : menu_type_icon,
          is_active,
        ],
        (err: ErrorType) => {
          err
            ? mainWindow.webContents.send(
                'context_bridge_menu_type_response',
                err.message
              )
            : mainWindow.webContents.send('context_bridge_menu_type_response', {
                status: 'inserted',
              });
        }
      );
    });
    db.close();
  }
});

// Get menu type lists as an Array
getListItems(
  'get_menu_type_lists',
  'get_menu_type_lists_response',
  'menu_type'
);

// Get menu_type only is_active items & id, menu_type etc.
getListItems(
  'get_active_menu_type_lists',
  'get_active_menu_type_lists_response',
  'menu_type',
  'menu_type',
  true
);

//Delete menu type from the DB
deleteListItem(
  'delete_menu_type_item', //channel name
  'delete_menu_type_item_response', //response event,
  'menu_type' //table name
);

/*==================================================================
  MENU ADDONS
==================================================================*/
// Insert menu addons
ipcMain.on('context_bridge_menu_addons', (_event, args) => {
  let { id, menu_id, add_on_id, is_active, date_inserted } = args;

  // Execute if the event has row ID / data ID. It is used to update a specific item
  if (args.id !== undefined) {
    let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);

    db.serialize(() => {
      db.run(
        `INSERT OR REPLACE INTO menu_add_on (id, menu_id, add_on_id, is_active, date_inserted)
        VALUES (?, ?, ?, ?, ?)`,
        [id, menu_id, add_on_id, is_active, date_inserted],
        (err: ErrorType) => {
          err
            ? mainWindow.webContents.send(
                'context_bridge_menu_addons_response',
                err.message
              )
            : mainWindow.webContents.send(
                'context_bridge_menu_addons_response',
                {
                  status: 'updated',
                }
              );
        }
      );
    });
    db.close();
  } else {
    // Execute if it is new, then insert it
    let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);
    db.serialize(() => {
      db.run(
        `CREATE TABLE IF NOT EXISTS menu_add_on (
          'id' INTEGER PRIMARY KEY AUTOINCREMENT,
          'menu_id' INT,
          'add_on_id' INT,
          'is_active' INT,
          'date_inserted' DATETIME
        )`
      ).run(
        `INSERT OR REPLACE INTO menu_add_on (menu_id, add_on_id, is_active, date_inserted)
          VALUES (?, ?, ?, ?)`,
        [menu_id, add_on_id, is_active, Date.now()],
        (err: ErrorType) => {
          err
            ? mainWindow.webContents.send(
                'context_bridge_menu_addons_response',
                err.message
              )
            : mainWindow.webContents.send(
                'context_bridge_menu_addons_response',
                {
                  status: 'inserted',
                }
              );
        }
      );
    });
    db.close();
  }
});

// Get addons lists as an Array
getListItems(
  'get_menu_add_on_lists_channel',
  'get_menu_add_on_lists_channel_response',
  'menu_add_on',
  'id, menu_id, add_on_id'
);

//Delete menu addons from the DB
deleteListItem(
  'delete_menu_addons_item', //channel name
  'delete_menu_addons_item_response', //response event,
  'menu_add_on' //table name
);

// Get addons lists in names as an Array
getListItems(
  'get_addons_name_list',
  'get_addons_name_list_response',
  'addons',
  'add_on_id, add_on_name',
  true
);

ipcMain.on('get_addons_list_for_pos', (_event, args) => {
  let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);
  let { status } = args;
  // let sql = `SELECT ${query} FROM ${table} ${
  //   condition && 'WHERE is_active = 1'
  // }`;

  let sql = `SELECT menu_add_on.menu_id AS food_id, addons.*, addons.price AS total_price FROM addons
  INNER JOIN menu_add_on ON menu_add_on.add_on_id = addons.add_on_id
  WHERE addons.is_active = 1`;

  if (status) {
    db.serialize(() => {
      db.all(sql, [], (_err: ErrorType, rows: any) => {
        mainWindow.webContents.send('get_addons_list_for_pos_response', rows);
      });
    });
  }

  db.close();
});

// Get food lists as an Array from the DB only [id, product_name]
getListItems(
  'get_food_name_lists_channel',
  'get_food_name_lists_channel_response',
  'item_foods',
  'id, product_name, product_image',
  true
);

// Get Currency Lists
getListItems('get_currency_lists', 'get_currency_lists_response', 'currency');

deleteListItem(
  'delete_currency_list_item', //channel name
  'delete_currency_list_item_response', //response event,
  'currency' //table name
);

// const columns
insertData(
  'insert_currency', //Event Name
  'insert_currency_response', //Event response
  'currency', //Table name
  'currency_name, currency_icon, position, currency_rate' //columns name
);

/*===================================================
  New Customer Name in to POS
=====================================================*/
// Insert New Customer Info
ipcMain.on('insert_customer_info', (_event, args: any) => {
  let { id, customer_name, customer_email, customer_phone, customer_address } =
    args;

  // Execute if the event has row ID / data ID. It is used to update a specific item
  if (args.id !== undefined) {
    let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);

    db.serialize(() => {
      db.run(
        `INSERT OR REPLACE INTO customer_info (id, customer_name, customer_email, customer_phone, customer_address)
        VALUES (?, ?, ?, ?, ?)`,
        [id, customer_name, customer_email, customer_phone, customer_address],
        (err: ErrorType) => {
          err
            ? mainWindow.webContents.send(
                'insert_customer_info_response',
                err.message
              )
            : mainWindow.webContents.send('insert_customer_info_response', {
                status: 'updated',
              });
        }
      );
    });
    db.close();
  } else {
    // Execute if it is new, then insert it
    let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);
    db.serialize(() => {
      db.run(
        `CREATE TABLE IF NOT EXISTS customer_info (
          'id' INTEGER PRIMARY KEY AUTOINCREMENT,
          'customer_name' varchar(150),
          'customer_email' varchar(100),
          'customer_phone' varchar(200),
          'customer_address' varchar(250)
        )`
      ).run(
        `INSERT OR REPLACE INTO customer_info (customer_name, customer_email, customer_phone, customer_address)
          VALUES (?, ?, ?, ?)`,
        [customer_name, customer_email, customer_phone, customer_address],
        (err: ErrorType) => {
          err
            ? mainWindow.webContents.send(
                'insert_customer_info_response',
                err.message
              )
            : mainWindow.webContents.send('insert_customer_info_response', {
                status: 'inserted',
              });
        }
      );
    });
    db.close();
  }
});

/*================================================================
  Get addons and variants
==================================================================*/
ipcMain.on('get_addons_and_variant', (_event: any, args) => {
  let food_addon_variants: any = {};
  let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);
  let sql = `SELECT addons.add_on_id, addons.add_on_name, addons.price
  FROM addons
  INNER JOIN menu_add_on
  ON menu_add_on.add_on_id = addons.add_on_id
  INNER JOIN item_foods
  ON menu_add_on.menu_id = item_foods.id
  WHERE item_foods.id = ${args} and menu_add_on.is_active = 1`;

  let sql2 = `SELECT variants.*
  FROM variants
  INNER JOIN item_foods
  ON item_foods.id = variants.food_id
  WHERE item_foods.id = ${args}`;

  db.serialize(() => {
    db.all(sql, [], (_err: ErrorType, rows: any) => {
      food_addon_variants['addons'] = rows;
    });
    db.all(sql2, [], (_err: ErrorType, rows: any) => {
      food_addon_variants['variants'] = rows;
    });
  });
  db.close();
  setTimeout(() => {
    mainWindow.webContents.send(
      'get_addons_and_variant_response',
      food_addon_variants
    );
  }, 1000);
});

// Get Customer names as an Array
getListItems(
  'get_customer_names',
  'get_customer_names_response',
  'customer_info',
  'id, customer_name'
);

// Language table created
(() => {
  let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);
  db.serialize(() => {
    db.run(
      `CREATE TABLE IF NOT EXISTS language (
        'id' INTEGER PRIMARY KEY AUTOINCREMENT,
        'key_words' varchar(255)
      )`
    );
  });
  db.close();
})();

ipcMain.on('get_language', (_event, args) => {
  if (args.status) {
    let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);
    let sql = `SELECT language.* FROM language`;
    db.serialize(() => {
      db.all(sql, [], (_err: ErrorType, rows: any) => {
        mainWindow.webContents.send('get_language_response', rows);
      });
    });
    db.close();
  }
});

/*==================================================================
  FUNCTIONS DEFINITIONS
==================================================================*/
/**
 *
 *
 * @params string event name
 * @params string event response
 * @params string database table name
 * @params string event name
 */
function insertData(
  eventName: any,
  eventResponse: any,
  table: any,
  columns: any
) {
  ipcMain.on(eventName, (_event, args) => {
    let { id, currency_name, currency_icon, position, currency_rate } = args;

    // Execute if the event has row ID / data ID. It is used to update a specific item
    if (args.id !== undefined) {
      let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);

      db.serialize(() => {
        db.run(
          `INSERT OR REPLACE INTO ${table} (id, currency_name, currency_icon, position, currency_rate)
          VALUES (?, ?, ?, ?, ?)`,
          [id, currency_name, currency_icon, position, currency_rate],
          (err: ErrorType) => {
            err
              ? mainWindow.webContents.send(eventResponse, err.message)
              : mainWindow.webContents.send(eventResponse, {
                  status: 'updated',
                });
          }
        );
      });
      db.close();
    } else {
      // Execute if it is new, then insert it
      let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);
      db.serialize(() => {
        db.run(
          `CREATE TABLE IF NOT EXISTS ${table} (
            'id' INTEGER PRIMARY KEY AUTOINCREMENT,
            'currency_name' varchar(50),
            'currency_icon' varchar(50),
            'position' INT,
            'currency_rate' real
          )`
        ).run(
          `INSERT OR REPLACE INTO ${table} (${columns})
            VALUES (?, ?, ?, ?)`,
          [currency_name, currency_icon, position, currency_rate],
          (err: ErrorType) => {
            err
              ? mainWindow.webContents.send(eventResponse, err.message)
              : mainWindow.webContents.send(eventResponse, {
                  status: 'inserted',
                });
          }
        );
      });
      db.close();
    }
  });
}

/**
 * Delete single item from the database based on the ID
 *
 * @params string channel name
 * @params string event response
 * @params string database table name
 * */
function deleteListItem(
  channel: string,
  eventResponse: string,
  table: string
): void {
  ipcMain.on(channel, (_event, args) => {
    let { id } = args;
    let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);

    db.serialize(() => {
      db.run(`DELETE FROM ${table} WHERE id = ?`, id, (err: ErrorType) => {
        err
          ? mainWindow.webContents.send(eventResponse, {
              status: err,
            })
          : mainWindow.webContents.send(eventResponse, {
              status: true,
            });
      });
    });
    db.close();
  });
}

// Get addons lists in names as an Array
function getListItems(
  channelName: string,
  response: string,
  table: string,
  query: string = '*',
  condition?: boolean
) {
  ipcMain.on(channelName, (_event: Electron.IpcMainEvent, args) => {
    let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);
    let { status } = args;
    let sql = `SELECT ${query} FROM ${table} ${
      condition && 'WHERE is_active = 1'
    }`;

    if (status) {
      db.serialize(() => {
        db.all(sql, [], (_err: ErrorType, rows: any) => {
          mainWindow.webContents.send(response, rows);
        });
      });
    }

    db.close();
  });
}

// Get order data to create token
ipcMain.on('get_data_to_create_token', (_event, args) => {
  if (args.status) {
    let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);
    db.serialize(() => {
      db.all(
        `SELECT * FROM orders ORDER BY order_id DESC LIMIT 1`,
        [],
        (_err: ErrorType, rows: any) => {
          if (rows) {
            mainWindow.webContents.send(
              'get_data_to_create_token_response',
              rows[0]
            );
          }
        }
      );
    });
    db.close();
  }
});

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch((err) => console.log(err));

/************************************************
 * HRM
 ***********************************************/
// INSERT DESIGNATION DATA
ipcMain.on('insert_employee_designation', (_event, args) => {
  let { id, designation, designation_details, waiter, chef, manager } = args;

  // Execute if the event has row ID / data ID. It is used to update a specific item
  if (args.id !== undefined) {
    let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);

    db.serialize(() => {
      db.run(
        `INSERT OR replace INTO emp_designation (id, designation, designation_details, waiter, chef, manager) VALUES (?, ?, ?, ?, ?, ?)`,
        [id, designation, designation_details, waiter, chef, manager],
        (err: ErrorType) => {
          err
            ? mainWindow.webContents.send(
                'insert_employee_designation_response',
                err.message
              )
            : mainWindow.webContents.send(
                'insert_employee_designation_response',
                {
                  status: 'updated',
                }
              );
        }
      );
    });
    db.close();
  } else {
    // Execute if it is new, then insert it
    let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);
    db.serialize(() => {
      db.run(
        `CREATE TABLE IF NOT EXISTS emp_designation (
          'id' INTEGER PRIMARY KEY AUTOINCREMENT,
          'designation' varchar(150),
          'designation_details' varchar(100),
          'waiter' INT,
          'chef' INT,
          'manager' INT
        )`
      ).run(
        `INSERT OR REPLACE INTO emp_designation (designation, designation_details, waiter, chef, manager)
          VALUES (?, ?, ?, ?, ?)`,
        [designation, designation_details, waiter, chef, manager],
        (err: ErrorType) => {
          err
            ? mainWindow.webContents.send(
                'insert_employee_designation_response',
                err.message
              )
            : mainWindow.webContents.send(
                'insert_employee_designation_response',
                {
                  status: 'inserted',
                }
              );
        }
      );
    });
    db.close();
  }
});

getListItems(
  'get_employee_designation',
  'get_employee_designation_response',
  'emp_designation'
);
deleteListItem(
  'delete_employee_designation',
  'delete_employee_designation_response',
  'emp_designation'
);

/*********************
 * DEPARTMENT
 ********************/
// INSERT DEPARTMENT DATA
ipcMain.on('insert_department', (_event, args) => {
  let { id, department_name } = args;

  // Execute if the event has row ID / data ID. It is used to update a specific item
  if (args.id !== undefined) {
    let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);

    db.serialize(() => {
      db.run(
        `INSERT OR replace INTO department (id, department_name) VALUES (?, ?)`,
        [id, department_name],
        (err: ErrorType) => {
          err
            ? mainWindow.webContents.send(
                'insert_department_response',
                err.message
              )
            : mainWindow.webContents.send('insert_department_response', {
                status: 'updated',
              });
        }
      );
    });
    db.close();
  } else {
    // Execute if it is new, then insert it
    let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);
    db.serialize(() => {
      db.run(
        `CREATE TABLE IF NOT EXISTS department (
          'id' INTEGER PRIMARY KEY AUTOINCREMENT,
          'department_name' varchar(150)
        )`
      ).run(
        `INSERT OR REPLACE INTO department (department_name) VALUES (?)`,
        [department_name],
        (err: ErrorType) => {
          err
            ? mainWindow.webContents.send(
                'insert_department_response',
                err.message
              )
            : mainWindow.webContents.send('insert_department_response', {
                status: 'inserted',
              });
        }
      );
    });
    db.close();
  }
});

// Fetch department data
getListItems('fetch_department', 'fetch_department_response', 'department');
deleteListItem('delete_department', 'delete_department_response', 'department');

/*********************
 * SUB DEPARTMENT
 ********************/
// INSERT SUB DEPARTMENT DATA
ipcMain.on('insert_sub_department', (_event, args) => {
  let { id, sub_department_name, department_id } = args;

  // Execute if the event has row ID / data ID. It is used to update a specific item
  if (args.id !== undefined) {
    let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);

    db.serialize(() => {
      db.run(
        `INSERT OR replace INTO sub_department (id, sub_department_name, department_id) VALUES (?, ?, ?)`,
        [id, sub_department_name, department_id],
        (err: ErrorType) => {
          err
            ? mainWindow.webContents.send(
                'insert_sub_department_response',
                err.message
              )
            : mainWindow.webContents.send('insert_sub_department_response', {
                status: 'updated',
              });
        }
      );
    });
    db.close();
  } else {
    // Execute if it is new, then insert it
    let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);
    db.serialize(() => {
      db.run(
        `CREATE TABLE IF NOT EXISTS sub_department (
          'id' INTEGER PRIMARY KEY AUTOINCREMENT,
          'sub_department_name' varchar(150),
          'department_id' INT
        )`
      ).run(
        `INSERT OR REPLACE INTO sub_department (sub_department_name, department_id) VALUES (?, ?)`,
        [sub_department_name, department_id],
        (err: ErrorType) => {
          err
            ? mainWindow.webContents.send(
                'insert_sub_department_response',
                err.message
              )
            : mainWindow.webContents.send('insert_sub_department_response', {
                status: 'inserted',
              });
        }
      );
    });
    db.close();
  }
});

getListItems(
  'fetch_sub_department',
  'fetch_sub_department_response',
  'sub_department'
);
deleteListItem(
  'delete_sub_department',
  'delete_sub_department_response',
  'sub_department'
);

// INSERT SALARY ADVANCE DATA
ipcMain.on('insert_salary_advance', (_event, args) => {
  let { id, employee_id, req_amount, release_amount, salary_month } = args;

  // Execute if the event has row ID / data ID. It is used to update a specific item
  if (args.id !== undefined) {
    let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);

    db.serialize(() => {
      db.run(
        `INSERT OR replace INTO salary_advance (id, employee_id, req_amount, release_amount, salary_month) VALUES (?, ?, ?, ?, ?)`,
        [id, employee_id, req_amount, release_amount, salary_month],
        (err: ErrorType) => {
          err
            ? mainWindow.webContents.send(
                'insert_salary_advance_response',
                err.message
              )
            : mainWindow.webContents.send('insert_salary_advance_response', {
                status: 'updated',
              });
        }
      );
    });
    db.close();
  } else {
    // Execute if it is new, then insert it
    let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);
    db.serialize(() => {
      db.run(
        `CREATE TABLE IF NOT EXISTS salary_advance (
          'id' INTEGER PRIMARY KEY AUTOINCREMENT,
          'employee_id' INT NOT NULL,
          'req_amount' INT,
          'release_amount' INT DEFAULT 0,
          'salary_month' TEXT,
          'created_at' DATETIME
        )`
      ).run(
        `INSERT OR REPLACE INTO salary_advance (employee_id, req_amount, release_amount, salary_month, created_at) VALUES (?, ?, ?, ?, ?)`,
        [employee_id, req_amount, release_amount, salary_month, Date.now()],
        (err: ErrorType) => {
          err
            ? mainWindow.webContents.send(
                'insert_salary_advance_response',
                err.message
              )
            : mainWindow.webContents.send('insert_salary_advance_response', {
                status: 'inserted',
              });
        }
      );
    });
    db.close();
  }
});

ipcMain.on('send_status_to_create_table', (_event, args) => {
  if (args.status) {
    let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);

    db.serialize(() => {
      db.run(
        `CREATE TABLE IF NOT EXISTS emp_attendance_time (
          "id" INTEGER PRIMARY KEY AUTOINCREMENT,
          "attendance_time" VARCHAR(100)
          )`
      )
        .run(
          `CREATE TABLE IF NOT EXISTS emp_types (
            "id" INTEGER PRIMARY KEY AUTOINCREMENT,
            "emp_type" VARCHAR(100)
            )`
        )
        .run(
          `CREATE TABLE IF NOT EXISTS emp_pay_frequency (
            "id" INTEGER PRIMARY KEY AUTOINCREMENT,
            "frequency" VARCHAR(100)
            )`
        )
        .run(
          `CREATE TABLE IF NOT EXISTS emp_duty_types (
              "id" INTEGER PRIMARY KEY AUTOINCREMENT,
              "duty_type" VARCHAR(100)
              )`
        )
        .run(
          `CREATE TABLE IF NOT EXISTS emp_rate_types (
              "id" INTEGER PRIMARY KEY AUTOINCREMENT,
              "rate_type" VARCHAR(100)
              )`
        )
        .all(`SELECT * FROM emp_types`, [], (_err: ErrorType, rows: any) => {
          if (!rows.length) {
            db.run(
              `INSERT INTO emp_attendance_time(attendance_time) VALUES("Attendance Time (15:30 - 20:30)"),("Attendance Time (15:30 - 20:30)")`
            )
              .run(
                `INSERT INTO emp_types(emp_type) VALUES("Full Time"),("Part Time")`
              )
              .run(
                `INSERT INTO emp_pay_frequency(frequency) VALUES("Weekly"),("Monthly"),("Annual")`
              )
              .run(
                `INSERT INTO emp_duty_types(duty_type) VALUES("Full Time"),("Part Time"),("Contractual")`
              )
              .run(
                `INSERT INTO emp_rate_types(rate_type) VALUES("Hourly"),("Monthly")`
              );
            db.close();
          } else {
            db.close();
          }
        });
    });
  }
});

// INSERT EMPLOYEE
ipcMain.on('insert_employee', (_event: Electron.IpcMainEvent, args: any) => {
  let {
    first_name,
    last_name,
    email,
    phone,
    country,
    state,
    city,
    zip_code,
    attendance_time,
    employee_type,
    account_number,
    bank_name,
    bban_number,
    branch_name,
    division,
    hire_date,
    pay_frequency_text,
    home_department,
    termination_date,
    termination_reason,
    designation,
    original_hire_date,
    voluntary_termination,
    pay_frequency,
    hourly_rate2,
    department_text,
    duty_type,
    re_hire_date,
    rate_type,
    rate,
    hourly_rate3,
    benefit_class_code,
    benefit_accrual_date,
    benefit_description,
    benefit_status,
    supervisor_name,
    supervisor_report,
    is_supervisor,
    date_of_birth,
    eeo_class,
    work_in_state,
    gender,
    ethnic_group,
    live_in_state,
    marital_status,
    ssn,
    citizenship,
    pp_image,
    home_email,
    home_phone,
    cell_phone,
    business_email,
    business_phone,
    emergency_contact,
    emergency_work_phone,
    alter_emergency_contact,
    alt_emergency_work_phone,
    emergency_home_phone,
    emergency_contact_relation,
    alt_emergency_home_phone,
    custom_field_name,
    custom_value,
    custom_field_type,
    basic_salary,
    house_rent,
    medical,
    others_allowance,
    gross_salary,
    tranport_allowance,
  } = args;
  let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);

  db.serialize(() => {
    db.run(
      `CREATE TABLE IF NOT EXISTS employees (
      'id' INTEGER PRIMARY KEY AUTOINCREMENT,
      'first_name' VARCHAR(255) NOT NULL,
      'last_name' VARCHAR(255) DEFAULT NULL,
      'email' VARCHAR(255) NOT NULL,
      'phone' VARCHAR(50) NOT NULL,
      'country' INT,
      'state' INT,
      'city' VARCHAR(255),
      'zip_code' INT,
      'attendance_time' INT,
      'employee_type' INT,
      'account_number' INT NOT NULL,
      'bank_name' VARCHAR(255) NOT NULL,
      'bban_number' VARCHAR(255) NOT NULL,
      'branch_name' VARCHAR(255) NOT NULL,
      'division' INT NOT NULL,
      'hire_date' INT,
      'pay_frequency_text' VARCHAR(255) NOT NULL,
      'home_department' VARCHAR(255) NOT NULL,
      'termination_date' INT,
      'termination_reason' TEXT NOT NULL,
      'designation' INT NOT NULL,
      'original_hire_date' INT,
      'voluntary_termination' INT NOT NULL,
      'pay_frequency' INT NOT NULL,
      'hourly_rate2' REAL NOT NULL,
      'department_text' VARCHAR(255) NOT NULL,
      'duty_type' INT NOT NULL,
      're_hire_date' INT,
      'rate_type' INT NOT NULL,
      'rate' REAL NOT NULL,
      'hourly_rate3' INT NOT NULL,
      'benefit_class_code' VARCHAR(255),
      'benefit_accrual_date' INT,
      'benefit_description' TEXT,
      'benefit_status' INT,
      'supervisor_name' INT,
      'supervisor_report' VARCHAR(255),
      'is_supervisor' INT,
      'date_of_birth' INT NOT NULL,
      'eeo_class' VARCHAR(255),
      'work_in_state' VARCHAR(255),
      'gender' VARCHAR(50) NOT NULL,
      'ethnic_group' VARCHAR(255),
      'live_in_state' VARCHAR(255),
      'marital_status' VARCHAR(100),
      'ssn' VARCHAR(255),
      'citizenship' VARCHAR(255),
      'pp_image' VARCHAR(255),
      'home_email' VARCHAR(255),
      'home_phone' VARCHAR(50),
      'cell_phone' VARCHAR(50),
      'business_email' VARCHAR(255),
      'business_phone' VARCHAR(50),
      'emergency_contact' VARCHAR(50),
      'emergency_work_phone' VARCHAR(50),
      'alter_emergency_contact' VARCHAR(50),
      'alt_emergency_work_phone' VARCHAR(50),
      'emergency_home_phone' VARCHAR(50),
      'emergency_contact_relation' VARCHAR(50),
      'alt_emergency_home_phone' VARCHAR(50),
      'custom_field_name' VARCHAR(255),
      'custom_value' VARCHAR(255),
      'custom_field_type' VARCHAR(255)
      )`
    )
      .run(
        `CREATE TABLE IF NOT EXISTS employees_salary (
    'id' INTEGER PRIMARY KEY AUTOINCREMENT,
    'basic_salary' REAL,
    'house_rent' REAL,
    'medical' REAL,
    'others_allowance' REAL,
    'gross_salary' REAL NOT NULL,
    'tranport_allowance' REAL
    )`
      )
      .run(
        `INSERT INTO employees (
        first_name,
        last_name,
        email,
        phone,
        country,
        state,
        city,
        zip_code,
        attendance_time,
        employee_type,
        account_number,
        bank_name,
        bban_number,
        branch_name,
        division,
        hire_date,
        pay_frequency_text,
        home_department,
        termination_date,
        termination_reason,
        designation,
        original_hire_date,
        voluntary_termination,
        pay_frequency,
        hourly_rate2,
        department_text,
        duty_type,
        re_hire_date,
        rate_type,
        rate,
        hourly_rate3,
        benefit_class_code,
        benefit_accrual_date,
        benefit_description,
        benefit_status,
        supervisor_name,
        supervisor_report,
        is_supervisor,
        date_of_birth,
        eeo_class,
        work_in_state,
        gender,
        ethnic_group,
        live_in_state,
        marital_status,
        ssn,
        citizenship,
        pp_image,
        home_email,
        home_phone,
        cell_phone,
        business_email,
        business_phone,
        emergency_contact,
        emergency_work_phone,
        alter_emergency_contact,
        alt_emergency_work_phone,
        emergency_home_phone,
        emergency_contact_relation,
        alt_emergency_home_phone,
        custom_field_name,
        custom_value,
        custom_field_type
        ) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        [
          first_name,
          last_name ? last_name : null,
          email,
          phone,
          country ? country : null,
          state ? state : null,
          city ? city : null,
          zip_code ? zip_code : null,
          attendance_time ? attendance_time : null,
          employee_type ? employee_type : null,
          account_number,
          bank_name,
          bban_number,
          branch_name,
          division,
          hire_date ? hire_date : null,
          pay_frequency_text,
          home_department,
          termination_date ? termination_date : null,
          termination_reason,
          designation,
          original_hire_date ? original_hire_date : null,
          voluntary_termination,
          pay_frequency,
          hourly_rate2,
          department_text,
          duty_type,
          re_hire_date ? re_hire_date : null,
          rate_type,
          rate,
          hourly_rate3,
          benefit_class_code ? benefit_class_code : null,
          benefit_accrual_date ? benefit_accrual_date : null,
          benefit_description ? benefit_description : null,
          benefit_status ? benefit_status : null,
          supervisor_name ? supervisor_name : null,
          supervisor_report ? supervisor_report : null,
          is_supervisor ? is_supervisor : null,
          date_of_birth,
          eeo_class ? eeo_class : null,
          work_in_state,
          gender,
          ethnic_group ? ethnic_group : null,
          live_in_state ? live_in_state : null,
          marital_status ? marital_status : null,
          ssn ? ssn : null,
          citizenship ? citizenship : null,
          pp_image ? pp_image : null,
          home_email ? home_email : null,
          home_phone ? home_phone : null,
          cell_phone,
          business_email ? business_email : null,
          business_phone ? business_phone : null,
          emergency_contact,
          emergency_work_phone,
          alter_emergency_contact ? emergency_contact : null,
          alt_emergency_work_phone ? alt_emergency_work_phone : null,
          emergency_home_phone,
          emergency_contact_relation ? emergency_contact_relation : null,
          alt_emergency_home_phone ? alt_emergency_home_phone : null,
          custom_field_name ? custom_field_name : null,
          custom_value ? custom_value : null,
          custom_field_type ? custom_field_type : null,
        ],
        (err: ErrorType) => {
          err
            ? mainWindow.webContents.send(
                'insert_employee_response',
                err.message
              )
            : mainWindow.webContents.send('insert_employee_response', {
                status: 'inserted',
              });
        }
      )
      .run(
        `INSERT INTO employees_salary (basic_salary, house_rent, medical, others_allowance, gross_salary, tranport_allowance) VALUES (?,?,?,?,?,?)`,
        [
          basic_salary ? basic_salary : null,
          house_rent ? house_rent : null,
          medical ? medical : null,
          others_allowance ? others_allowance : null,
          gross_salary ? gross_salary : null,
          tranport_allowance ? tranport_allowance : null,
        ]
      );
  });
  db.close();
});

// TODO: JOINING QUERY
getListItems(
  'fetch_salary_advance',
  'fetch_salary_advance_response',
  'salary_advance'
);
deleteListItem(
  'delete_salary_advance',
  'delete_salary_advance_response',
  'salary_advance'
);

// INSERT FLOOR
ipcMain.on('insert_floor', (_event, args) => {
  let { id, floorName } = args;

  // Execute if the event has row ID / data ID. It is used to update a specific item
  if (args.id !== undefined) {
    let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);

    db.serialize(() => {
      db.run(
        `UPDATE floor SET floorName = ? WHERE id = ?`,
        [floorName, id],
        (err: ErrorType) => {
          err
            ? mainWindow.webContents.send('insert_floor_response', err.message)
            : mainWindow.webContents.send('insert_floor_response', {
                status: 'updated',
              });
        }
      );
    });
    db.close();
  } else {
    // Execute if it is new, then insert it
    let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);
    db.serialize(() => {
      db.run(
        `CREATE TABLE IF NOT EXISTS floor (
          'id' INTEGER PRIMARY KEY AUTOINCREMENT,
          'floorName' varchar(15) NOT NULL,
          'created_at' DATETIME
        )`
      ).run(
        `INSERT OR REPLACE INTO floor (floorName, created_at) VALUES (?, ?)`,
        [floorName, Date.now()],
        (err: ErrorType) => {
          err
            ? mainWindow.webContents.send('insert_floor_response', err.message)
            : mainWindow.webContents.send('insert_floor_response', {
                status: 'inserted',
              });
        }
      );
    });
    db.close();
  }
});
getListItems('fetch_floor', 'fetch_floor_response', 'floor', 'id, floorName');
deleteListItem('delete_floor', 'delete_floor_response', 'floor');

// INSERT TABLE DATA
ipcMain.on('insert_customer_table', (_event, args) => {
  let { id, tablename, person_capacity, table_icon, floorId, status } = args;

  // Execute if the event has row ID / data ID. It is used to update a specific item
  if (args.id !== undefined) {
    let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);

    db.serialize(() => {
      db.run(
        `UPDATE customer_table SET tablename = ?, person_capacity = ?, table_icon = ?, floorId = ? WHERE id = ?`,
        [tablename, person_capacity, table_icon, floorId, id],
        (err: ErrorType) => {
          err
            ? mainWindow.webContents.send(
                'insert_customer_table_response',
                err.message
              )
            : mainWindow.webContents.send('insert_customer_table_response', {
                status: 'updated',
              });
        }
      );
    });
    db.close();
  } else {
    // Execute if it is new, then insert it
    let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);
    db.serialize(() => {
      db.run(
        `CREATE TABLE IF NOT EXISTS customer_table (
          'id' INTEGER PRIMARY KEY AUTOINCREMENT,
          'tablename' varchar(50) NOT NULL,
          'person_capacity' INT NOT NULL,
          'table_icon' TEXT,
          'floorId' INT,
          'status' INT NOT NULL,
          'created_at' INT
        )`
      ).run(
        `INSERT OR REPLACE INTO customer_table (tablename, person_capacity, table_icon, floorId, status, created_at) VALUES (?, ?, ?, ?, ?, ?)`,
        [tablename, person_capacity, table_icon, floorId, status, Date.now()],
        (err: ErrorType) => {
          err
            ? mainWindow.webContents.send(
                'insert_customer_table_response',
                err.message
              )
            : mainWindow.webContents.send('insert_customer_table_response', {
                status: 'inserted',
              });
        }
      );
    });
    db.close();
  }
});

// Get waiter Name
ipcMain.on('get_waiter_names', (_event, args) => {
  if (args.status) {
    let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);
    let sql = `SELECT employees.id, employees.first_name, employees.last_name from employees
    WHERE employees.designation = (SELECT id FROM emp_designation WHERE waiter = 1)`;
    db.serialize(() => {
      db.all(sql, [], (_err: ErrorType, rows: any) => {
        mainWindow.webContents.send('get_waiter_names_response', rows);
      });
    });
  }
});

ipcMain.on('fetch_customer_table', (_event: Electron.IpcMainEvent, args) => {
  let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);
  let { status } = args;
  let sql = `SELECT customer_table.id, customer_table.tablename, customer_table.person_capacity, customer_table.table_icon, customer_table.floorId, customer_table.status, floor.floorName FROM customer_table INNER JOIN floor ON customer_table.floorId = floor.id`;

  if (status) {
    db.serialize(() => {
      db.all(sql, [], (_err: ErrorType, rows: any) => {
        mainWindow.webContents.send('fetch_customer_table_response', rows);
      });
    });
  }

  db.close();
});

deleteListItem(
  'delete_customer_table',
  'delete_customer_table_response',
  'customer_table'
);

// CREATE TABLE WHEN THE APP IS INSTALLED
ipcMain.on('create_customer_type', (_event, args) => {
  if (args.status) {
    let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);

    db.serialize(() => {
      db.run(
        `CREATE TABLE IF NOT EXISTS customer_type (
          "id" INTEGER PRIMARY KEY AUTOINCREMENT,
          "customertype" VARCHAR(100)
          )`
      ).all(`SELECT * FROM customer_type`, [], (_err: ErrorType, rows: any) => {
        if (!rows.length) {
          db.run(
            `INSERT INTO customer_type(customertype) VALUES
              ("Walk In"),
              ("Online Customer"),
              ("Third Party"),
              ("Take Away")`
          );
          db.close();
        } else {
          db.all(
            `SELECT * FROM customer_type`,
            [],
            (_err: ErrorType, rows: any) => {
              mainWindow.webContents.send(
                'create_customer_type_response',
                rows
              );
            }
          );

          db.close();
        }
      });
    });
  }
});

// FETCH FLOOR & TABLE INFO
ipcMain.on(
  'fetch_table_based_on_floor_id',
  (_event: Electron.IpcMainEvent, args) => {
    const { floorId } = args;

    let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);

    let sql = `SELECT customer_table.id, customer_table.tablename, customer_table.person_capacity, customer_table.status, customer_table.floorId FROM customer_table WHERE floorId = ${floorId}`;

    db.serialize(() => {
      db.all(sql, [], (_err: ErrorType, rows: any) => {
        mainWindow.webContents.send(
          'fetch_table_based_on_floor_id_response',
          rows
        );
      });
    });

    db.close();
  }
);
