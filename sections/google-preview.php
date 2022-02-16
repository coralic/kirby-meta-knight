<?php

use Kirby\Toolkit\Config;
use Kirby\Toolkit\I18n;

return [
  'props' => [
    'headline' => function ($headline = 'Google Search Preview') {
      return I18n::translate($headline, $headline);
    }
  ],
  'computed' => [
    'headline' => function () {
      if ($this->headline) {
        return $this->model()->toString($this->headline);
      }

      return ucfirst($this->name);
    },
    'title' => function () {
      $kirby = kirby();
      $model = $this->model();

      if ($kirby->request()->query()->isNotEmpty()) {
        $model = $model->clone(['content' => array_merge(['title' => $model->title()->value()], $model->content()->data(), $kirby->request()->query()->data())]);
      }

      if ($model->site()->id() == $model->id()) {
        return $model->homePage()->toSafeString(
          $model->metaTemplate()->or(Config::get('coralic.meta-knight.defaultTemplate'))->value(),
          ['title' => $model->homePage()->metaTitle()->or($model->homePage()->title())]
        );
      }

      return $model->metaTitleComputed();
    },
    'fallbackDescription' => function () {
      $model = $this->model();

      if ($model->site()->id() == $model->id())
        return $model->homePage()->metaDescription()->value();

      return $model->site()->metaDescription()->value();
    },
    'url' => function () {
      return $this->model()->url();
    },
  ]
];
